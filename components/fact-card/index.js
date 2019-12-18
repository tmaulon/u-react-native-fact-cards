import React, { Component } from 'react'
import { View, Image, Button, Text } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

export default class FactCard extends Component {
    
    render() {
        return (
            <View style={{
                elevation: 1,
                shadowColor: '#000',
                shadowOffset: { width: 1, height: 1 },
                shadowOpacity: 0.7,
                width: wp('90%'),
                backgroundColor: '#fff'
            }}>
                <Image style={{ width: wp("90%"), height: hp("30%") }} source={{ uri: `https://source.unsplash.com/user/kensuke/${hp("30%")}x${wp("90%")}` }}
                />

                <Text> Voici du texte dans la carte</Text>

                <Button title="Voir la source" onPress={() => console.log('Button pressed')} ></Button>

            </View>

        )
    }
}