import React, {useState} from 'react';
import {View, Text, StyleSheet, Animated, TouchableOpacity} from 'react-native';
import {ScratchCard} from 'rn-scratch-card';

const App = () => {
  const [status, setStatus] = useState(0);
  const [offerText, setOfferText] = useState('');
  const [scratchCount, setScratchCount] = useState(0);
  const [fadeAnimation] = useState(new Animated.Value(0));

  const handleScratch = () => {
    setScratchCount(scratchCount + 1);
    if (scratchCount > 0 && !offerText) {
      const progress = (scratchCount / 100) * 100;
      if (progress >= 70) {
        setOfferText('Congratulations! You won 20% discount!!');
        animateOfferText();
      }
    }
    setStatus(1);
  };
  const animateOfferText = () => {
    Animated.timing(fadeAnimation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };
    const handleOfferButtonClick = () => {
      console.log("Claimed offer");
    }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Scratch Here!!!</Text>
      <View style={styles.scratchCardContainer}>
        <ScratchCard
          source={require('./src/Objects.png')}
          brushWidth={20}
          onScratch={handleScratch}
          style={styles.scratch_card}
        />
           {offerText ? (
          <Animated.View style={[styles.offerView, { opacity: fadeAnimation }]}>
            <Text style={styles.offerText} numberOfLines={2}>{offerText}</Text>
            <TouchableOpacity onPress={handleOfferButtonClick}>
              <View style={styles.offerButton}>
                <Text style={styles.offerButtonText}>Redeem</Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
        ) : null}
      </View>
      <Text>
        Scratch Status: {status === 0 ? 'Not Scratched Yet' : 'Scratched'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 40,
    color: '#000',
  },
  scratch_card: {
    width: 300,
    height: 300,
    margin: 20,
    elevation: 4,
  },
  scratchCardContainer: {
    width: '100%',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scratch_card: {
    width: 300,
    height: 300,
    margin: 20,
  },
  offerView: {
    position: 'absolute',
    textAlign: 'center',
    maxWidth: 280,
  },
  offerText: {
    fontSize:20,
    color:'#000'
  },

  offerButton: {
    backgroundColor:'blue',
    width:100,
    marginLeft:70,
    marginTop:20,
    borderRadius:7,
    alignItems:'center',
    justifyContent:'center'
  },
  offerButtonText: {
    color:'white',
    fontSize:20
  }
});

export default App;
