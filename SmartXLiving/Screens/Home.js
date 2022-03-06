import { SafeAreaView, StyleSheet, FlatList, TouchableOpacity, Text, View, ActivityIndicator, Image } from 'react-native';
import React, { useState, useEffect } from 'react';

const Home = ({ navigation, route }) => {

    const { userData } = route.params;
    const [category, setCategory] = useState("Chicken");
    const [data, setData] = useState([]);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch(`http://13.233.138.70:8080/getMenuByCategory?category=${category}`)
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => console.log(error))
    }, [category]);

    const foodCategory = [
        { id: 1, title: "Chicken" }, { id: 2, title: "Paneer" }, { id: 3, title: "Chaap" }, { id: 4, title: "Eggs" },
        { id: 5, title: "Veggies" }, { id: 6, title: "Daal" }, { id: 7, title: "Rice, Noodles, Bread & Butter" },
        { id: 8, title: "Corn Flakes, Fruits & Salads" }, { id: 9, title: "Milk & Tea (Country Delight Milk)" },
        { id: 10, title: "Soup, Sides, Snack, Sweets & Cold Drink" }
    ];

    const checkIfContains = (data) => {
        console.log("inside check");
        for (let i = 0; i < orders.length; i++) {

            if (orders[i].menu === data.menu) {

                data.quantity = orders[i].quantity + 1;
                setOrders((orders) => orders.filter((order) => order.menu !== data.menu))
                console.log(data.quantity)
                return true
            }
        }
        return false;
    }

    const addOrders = (item) => {
        let data =
        {
            "userId": userData.userId,
            "menu": item.id,
            "orderDate": new Date(),
            "whenOrder": 0,
            "quantity": 1
        }

        if (checkIfContains(data)) {
            setOrders(oldArray => [...oldArray, data]);
        } else {
            setOrders(oldArray => [...oldArray, data]);
        }
    }

    const renderCategory = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => setCategory(item.title)}>
                <View style={styles.cardView}>
                    <Text>{item.title}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    const renderMenu = ({ item }) => {
        return (
            <View style={styles.menuItem}>
                <View style={{ width: '45%' }}>
                    <Text> {item.item} </Text>
                </View>
                <View style={{ width: '35%' }}>
                    <Text> {item.portion} </Text>
                </View>
                <View style={{ width: '10%' }}>
                    <Text> {item.sxPoints} </Text>
                </View>
                <TouchableOpacity onPress={() => addOrders(item)}>
                    <View>
                        <Text style={{ fontSize: 30 }}> + </Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.userDetail}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{userData.firstName} {userData.lastName}</Text>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{userData.sxPoints}</Text>
            </View>

            <View style={styles.categoryList}>
                <FlatList
                    horizontal={true}
                    data={foodCategory}
                    renderItem={renderCategory}
                    keyExtractor={(item) => item.id}
                />
            </View>
            <View style={styles.titleView}>
                <Text style={styles.categoryTitle}>{category}</Text>
            </View>
            <View style={{ width: '96%', height: '55%' }}>
                <FlatList
                    data={data}
                    renderItem={renderMenu}
                    keyExtractor={(item) => item.id}
                />
            </View>
            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', margin: 10, width: '98%' }}
                disabled={orders.length == 0 ? true : false}
                onPress={() => console.log(orders)}>
                <View style={styles.titleView}>
                    <Text style={{ fontSize: 20, textAlign: 'center', fontWeight: 'bold' }}>Review &amp; Place Order</Text>
                </View>
            </TouchableOpacity>
        </SafeAreaView >
    );

}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#D6D6D6",
        alignItems: 'flex-start'
    },
    categoryList: {
        backgroundColor: '#fff',
        justifyContent: 'space-evenly',
        height: 80,
        width: '100%',
    },
    cardView: {
        justifyContent: 'space-evenly',
        height: 70,
        width: 70,
        borderWidth: 1,
        alignItems: 'center',
        margin: 8,
    },
    categoryTitle: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        flexWrap: 'wrap'
    },
    titleView: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        width: '100%',
        backgroundColor: '#fff',
        margin: 10
    },
    menuItem: {
        margin: 10,
        backgroundColor: '#fff',
        flexDirection: 'row',
        width: '100%',
        height: 40,
        alignItems: 'center',
    },
    userDetail: {
        margin: 10,
        backgroundColor: '#fff',
        flexDirection: 'row',
        width: '95%',
        height: 40,
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})