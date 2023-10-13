import { View, Text,StyleSheet,Image } from 'react-native'
import React from 'react';
import COLORS from '../constants/Colors';
import FONTS from '../constants/Fonts';
import IMAGES from '../constants/Images';
import { getPoster } from '../services/MovieService';
const CastCard = ({originalName,image,characterName}) => {
  return (
    <View style={styles.container}>
      <Image  style={styles.image} source={image?{uri:getPoster(image)}:IMAGES.NO_IMAGE}
      resizeMode={image? "cover" :"contain"}  />
      <Text numberOfLines={2} style={styles.originalName}>{originalName}</Text>
      <Text numberOfLines={2} style={styles.characterName}>{characterName}</Text>
    </View>
  )
}
const styles=StyleSheet.create({
    container: {
        flex: 1,
      },
      image: {
        height: 120,
        width: 80,
        borderRadius: 10,
      },
      originalName: {
        width: 80,
        color: COLORS.BLACK,
        fontFamily: FONTS.BOLD,
        fontSize: 12,
      },
      characterName: {
        width: 80,
        color: COLORS.LIGHT_GRAY,
        fontFamily: FONTS.BOLD,
        fontSize: 10,
      },
    });

export default CastCard