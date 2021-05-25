import React from 'react'
import {FlatList, Button, Text, StyleSheet, TextInput, View, TouchableOpacity, Image} from "react-native";
import SharedConfig from "../SharedConfig";
import {gql, useQuery} from "@apollo/client";

export default function UserDetailScreen(props,{navigation}) {
  const {id} = props.route.params
  const QUERY_USER = gql`
    {
        user(id: "${id}") {
              id
              title
              firstName
              lastName
              email
              phone
              gender
              registerDate
              dateOfBirth
              picture
        }
    }
  `;
  const {loading, error, data} = useQuery(QUERY_USER);
  console.log('DATA IS ' + JSON.stringify(data))

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      {error && <Text>{JSON.stringify(error)}</Text>}
      {loading &&
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}><Text>Loading...</Text></View>}
      {data && <View style={{
        marginVertical: 12,
        marginHorizontal: 12,
        backgroundColor: '#fff'
      }}>
        <View style={{alignItems:'center'}}>
          <Image style={{borderRadius:50,width:100,height:100}} source={{uri:data.user.picture}}/>
          <View style={[styles.rowHorizontal,{marginBottom:48}]}>
            <Text style={[styles.value,{flex:0,marginEnd:8}]}>{data.user.firstName}</Text>
            <Text style={[styles.value,{flex:0}]}>{data.user.lastName}</Text>
          </View>
        </View>
        <View style={styles.rowHorizontal}>
          <Text style={styles.title}>Email :</Text>
          <Text style={styles.value}>{data.user.email}</Text>
        </View>
        <View style={styles.rowHorizontal}>
          <Text style={styles.title}>Gender :</Text>
          <Text style={styles.value}>{data.user.gender}</Text>
        </View>
        <View style={styles.rowHorizontal}>
          <Text style={styles.title}>Phone :</Text>
          <Text style={styles.value}>{data.user.phone}</Text>
        </View>
        <View style={styles.rowHorizontal}>
          <Text style={styles.title}>Register Date :</Text>
          <Text style={styles.value}>{data.user.registerDate}</Text>
        </View>
        <View style={styles.rowHorizontal}>
          <Text style={styles.title}>Birthday :</Text>
          <Text style={styles.value}>{data.user.dateOfBirth}</Text>
        </View>
      </View>}
    </View>
  );

}

const styles = StyleSheet.create({
  rowVertical: {
    justifyContent: 'center',
  },
  rowHorizontal: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    marginEnd:16,
  },
  title: {
    fontSize: 16,
    marginEnd: 16,
    color: '#757575'
  },
  value: {
    flex:1,
    fontSize: 18,
    color: '#000'
  },

});