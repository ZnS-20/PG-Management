import { SafeAreaView, StyleSheet, FlatList, TouchableOpacity, Text, View, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';

const Home = ({ navigation, route }) => {

    const { userData } = route.params;
    const [category, setCategory] = useState("Chicken");
    const [data, setData] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userOrders, setUserOrders] = useState([]);




    const addQuantity = (json) => {
        for (let i = 0; i < json.length; i++) {
            Object.assign(json[i], { quantity: 0 });
        }
        return json;
    }

    useEffect(() => {
        setLoading(true);
        let tempCategories = category;
        tempCategories = category.replace('&', '%26');
        const unsubscribe = navigation.addListener('focus', () => {
            setOrders([]);
            setLoading(true);
            setCategory("Chicken")
            fetch(`http://3.111.6.92:8080/getMenuByCategory?category=Chicken`)
                .then((response) => response.json())
                .then((json) => { setData(addQuantity(json)); setLoading(false) })
                .catch((error) => console.log(error))
            fetch(`http://3.111.6.92:8080/getOrdersByUserId?userId=${userData.userId}`)
                .then((response) => response.json())
                .then((json) => setUserOrders(json))
                .catch((error) => console.log(error))
        });

        fetch(`http://3.111.6.92:8080/getMenuByCategory?category=${tempCategories}`)
            .then((response) => response.json())
            .then((json) => { setData(addQuantity(json)); setLoading(false) })
            .catch((error) => console.log(error))
        fetch(`http://3.111.6.92:8080/getOrdersByUserId?userId=${userData.userId}`)
            .then((response) => response.json())
            .then((json) => setUserOrders(json))
            .catch((error) => console.log(error))
        return unsubscribe;
    }, [category, navigation]);


    const foodCategory = [
        { id: 1, title: "Chicken" }, { id: 2, title: "Paneer" }, { id: 3, title: "Chaap" }, { id: 4, title: "Eggs" },
        { id: 5, title: "Veggies" }, { id: 6, title: "Daal" }, { id: 7, title: "Rice, Noodles, Bread & Butter" },
        { id: 8, title: "Corn Flakes, Fruits & Salads" }, { id: 9, title: "Milk & Tea (Country Delight Milk)" },
        { id: 10, title: "Soup, Sides, Snack, Sweets & Cold Drink" }
    ];

    const showOrders = () => {
        if (userOrders.length <= 0) {
            alert("You don't have any orders");
        } else {
            navigation.navigate('Previous Choices', { userOrders: userOrders });
        }
    }

    const checkIfContains = (data) => {
        for (let i = 0; i < orders.length; i++) {

            if (orders[i].menu === data.menu) {
                setOrders((orders) => orders.filter((order) => order.menu !== data.menu))
                return true
            }
        }
        return false;
    }

    const addOrders = (item) => {
        item.quantity = item.quantity + 1;
        let data =
        {
            "userId": userData.userId,
            "menu": item.id,
            "orderDate": new Date().toISOString().split('T')[0],
            "whenOrder": 0,
            "quantity": item.quantity,
            "itemName": item.item,
            "portion": item.portion,
            "sxPoints": item.sxPoints
        }

        if (checkIfContains(data)) {
            setOrders(oldArray => [...oldArray, data]);
        } else {
            setOrders(oldArray => [...oldArray, data]);
        }
        setOrders((orders) => orders.filter(order => JSON.stringify(order) !== '{}'));
    }

    const reduceQuantity = (item) => {
        if (item.quantity <= 0) {
            alert("Quantity cannot be less than 0");
            return;
        }
        item.quantity = item.quantity - 1;
        let data =
        {
            "userId": userData.userId,
            "menu": item.id,
            "orderDate": new Date().toISOString().split('T')[0],
            "whenOrder": 0,
            "quantity": item.quantity,
            "itemName": item.item,
            "portion": item.portion,
            "sxPoints": item.sxPoints
        }

        if (checkIfContains(data)) {
            if (item.quantity <= 0) {
                data = {};
            }
            setOrders(oldArray => [...oldArray, data]);
        } else {
            setOrders(oldArray => [...oldArray, data]);
        }
        setOrders((orders) => orders.filter(order => JSON.stringify(order) !== '{}'))
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
                <View style={{ width: '25%' }}>
                    <Text> {item.portion} </Text>
                </View>
                <View style={{ width: '10%' }}>
                    <Text> {item.sxPoints} </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {item.quantity > 0 ? <>
                        <TouchableOpacity onPress={() => reduceQuantity(item)}>
                            <Text style={{ fontSize: 30 }}> - </Text>
                        </TouchableOpacity>
                        <Text> {item.quantity} </Text>
                    </> : <></>}
                    <TouchableOpacity onPress={() => addOrders(item)}>
                        <Text style={{ fontSize: 30 }}> + </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.userDetail}>
                <View style={{ flex: 0.5, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{userData.firstName} {userData.lastName}</Text>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{userData.sxPoints}</Text>
                </View>
                <View style={{ flex: 0.5, flexDirection: 'row', justifyContent: 'space-evenly', borderWidth: 1, backgroundColor: '#D6D6D6' }}>
                    <TouchableOpacity onPress={() => showOrders()}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Previous Choices</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.categoryList}>
                <FlatList
                    horizontal={true}
                    data={foodCategory}
                    renderItem={renderCategory}
                    keyExtractor={(item) => { return item.id.toString() }}
                />
            </View>
            {loading ? (<ActivityIndicator />) : (<>
                <View style={styles.titleView}>
                    <Text style={styles.categoryTitle}>{category}</Text>
                </View>
                <View style={{ width: '96%', height: '55%' }}>
                    <FlatList
                        data={data}
                        renderItem={renderMenu}
                        nestedScrollEnabled={true}
                        keyExtractor={(item) => { return item.id.toString() }}
                    />
                </View>
            </>)}
            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', margin: 10, width: '98%' }}
                disabled={orders.length == 0 ? true : false}
                onPress={() => {
                    navigation.navigate('Review and Confirm Choice', { userData: userData, orders: orders });
                }}>
                <View style={styles.titleView}>
                    <Text style={{ fontSize: 20, textAlign: 'center', fontWeight: 'bold' }}>Review &amp; Confirm Choice</Text>
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
        width: '95%',
        backgroundColor: '#fff',
        margin: 10,

    },
    menuItem: {
        margin: 2,
        marginLeft: 10,
        backgroundColor: '#fff',
        flexDirection: 'row',
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