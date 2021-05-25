import React from 'react'
import {FlatList, Button, Text, StyleSheet, TextInput, View, TouchableOpacity, Image} from "react-native";
import SharedConfig from "../SharedConfig";
import {gql, useQuery} from "@apollo/client";

const QUERY_USERS = gql`
    {
        users(page: 1, limit: 10) {
            data {
                id
                title
                firstName
                lastName
                email
                picture
            }
            total
            page
            limit
            offset
        }
    }
`;

export default function UserIndexScreen({navigation}) {
  const {loading, error, data} = useQuery(QUERY_USERS);

  const renderItem = ({item}) => (
    <TouchableOpacity onPress={() => navigation.navigate('UserDetail', {id: item.id})}>
      <View style={{
        marginVertical: 12,
        marginHorizontal: 12,
        borderRadius: 8,
        borderColor: '#dadada',
        borderWidth: 1,
        padding: 8,
        backgroundColor: '#fff',
        alignItems:'center',
        flexDirection: 'row'
      }}>
        <Image style={{borderRadius: 24, width: 48, height:48}} source={{uri: item.picture}}/>
        <View style={{marginStart: 16}}>
          <View style={styles.rowHorizontal}>
            <Text style={styles.title}>FirstName :</Text>
            <Text style={styles.value}>{item.firstName}</Text>
          </View>
          <View style={styles.rowHorizontal}>
            <Text style={styles.title}>LastName :</Text>
            <Text style={styles.value}>{item.lastName}</Text>
          </View>
          <View style={styles.rowHorizontal}>
            <Text style={styles.title}>Email :</Text>
            <Text style={styles.value}>{item.email}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      {error && <Text>{JSON.stringify(error)}</Text>}
      {loading &&
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}><Text>Loading...</Text></View>}
      {data && <FlatList
        data={data.users.data}
        renderItem={renderItem}
        keyExtractor={item => item.id + ''}
      />}
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
  },
  title: {
    fontSize: 12,
    marginEnd: 16,
    color: '#757575'
  },
  value: {
    fontSize: 14,
    color: '#000'
  },

});