import React, { Component } from 'react'
import { View, Image, Button, Text } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

export default class FactCard extends Component {

    render() {
        return (
            <View style={{
                elevation: 1, // only for android
                shadowColor: '#000', //only for ios
                shadowOffset: { width: 1, height: 1 }, //only for ios
                shadowOpacity: 0.7,
                width: wp('90%'),
                backgroundColor: '#fff'
            }}>
                {/* <Image style={{ width: wp("90%"), height: hp("30%") }} source={{ uri: `https://picsum.photos/${hp("30%")}/${wp("90%")}?image=12` }}
                /> */}
                <Image style={{ width: wp("90%"), height: hp("30%") }} source={{ uri: `https://source.unsplash.com/user/kensuke/${hp("30%")}x${wp("90%")}` }}
                />

                <Text style={{ padding: 10, marginBottom: hp("3%") }}>Voici du texte dans la carte</Text>

                <Button title="Voir la source" onPress={() => console.log('Button pressed')} ></Button>

            </View>

        )
    }
}