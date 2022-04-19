import { SafeAreaView, View, Text, Alert, TouchableOpacity, StyleSheet, FlatList, BackHandler } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import React, { useState, useEffect } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

const OrderandReview = ({ navigation, route }) => {

    const { orders, userData } = route.params;

    const [date, setDate] = useState(new Date(new Date().getTime() + (330 * 60 * 1000) + (1000 * 60 * 60 * 24)));
    const [whenOrder, setWhenOrder] = useState("-1");
    const [total, setTotal] = useState(0);
    const [order, setOrder] = useState(orders);
    const [show, setShow] = useState(false);
    const minDate = new Date(new Date().getTime() + (330 * 60 * 1000) + (1000 * 60 * 60 * 24));
    const [userOrders, setUserOrders] = useState([]);

    useEffect(() => {
        let total = 0;
        for (let i = 0; i < order.length; i++) {
            total += order[i].quantity * order[i].sxPoints;
        }
        setTotal(total);
    }, [order])

    useEffect(() => {
        let formattedDate = (date.toISOString().split('T')[0]).split('-').reverse().join('-');
        fetch(`http://3.111.6.92:8080/getOrdersByUserIdAndDate?userId=${userData.userId}&date=${formattedDate}`)
            .then((response) => response.json())
            .then((json) => { setUserOrders(json) })
            .catch((error) => console.log(error))
    }, [date])


    const placeOrder = () => {
        let finalOrders = [];
        order.forEach(element => {
            let data = {
                "menu": {
                    "id": element.menu
                },
                "orderDate": date.toISOString().split('T')[0],
                "userId": {
                    "userId": userData.userId
                },
                "whenOrder": whenOrder,
                "quantity": element.quantity
            };
            finalOrders.push(data);
        });
        let updateUser = {
            "userId": userData.userId,
            "createdDate": userData.createdDate,
            "firstName": userData.firstName,
            "lastName": userData.lastName,
            "email": userData.email,
            "phoneNumber": userData.phoneNumber,
            "sxPoints": userData.sxPoints - total,
            "userName": userData.userName,
            "modifiedDate": date,
            "password": userData.password
        }
        fetch('http://3.111.6.92:8080/orderFood', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(finalOrders)
        }).catch((error) => console.log(error));
        fetch('http://3.111.6.92:8080/updateUser', {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateUser)
        }).catch((error) => console.log(error));

        updateUser.modifiedDate = 0;

        navigation.navigate({
            name: 'SmartXLiving',
            params: { userData: updateUser },
            merge: true
        })
    }


    const checkOrders = (date) => {
        if (whenOrder == -1) {
            alert("Select when to Order");
            return;
        }
        let remainingPoints = userData.sxPoints - total;
        if (remainingPoints < 0) {
            alert("You don't have enough points.")
            return;
        }
        if (setUserOrders != null || setUserOrders.length > 0) {
            let flag = false
            userOrders.forEach(element => {
                if (element.whenOrder == whenOrder) {
                    alert("You already selected your choice for " + (whenOrder == 0 ? "Breakfast" : whenOrder == 1 ? "Lunch" : "Dinner"))
                    flag = true
                }
            });
            if (flag)
                return;
        }
        placeOrder();
    }

    const addQuantity = (item, index) => {
        let attributes = { quantity: item.quantity + 1 }
        setOrder(
            [
                ...order.slice(0, index),
                Object.assign({}, order[index], attributes),
                ...order.slice(index + 1)
            ]
        );
    }

    const subtractQuantity = (item, index) => {
        if (item.quantity === 1) {
            setOrder(
                [
                    ...order.slice(0, index),
                    ...order.slice(index + 1)
                ]
            )
        } else {
            let attributes = { quantity: item.quantity - 1 }
            setOrder(
                [
                    ...order.slice(0, index),
                    Object.assign({}, order[index], attributes),
                    ...order.slice(index + 1)
                ]
            );
        }
    }

    const renderOrders = ({ item, index }) => {
        return (
            <View style={styles.items}>
                <Text> {item.itemName}</Text>
                <Text> {item.portion}</Text>
                <Text> {item.sxPoints * item.quantity}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => subtractQuantity(item, index)}>
                        <Text style={{ fontWeight: 'bold' }}> - </Text>
                    </TouchableOpacity>

                    <Text> {item.quantity} </Text>

                    <TouchableOpacity onPress={() => addQuantity(item, index)}>
                        <Text style={{ fontWeight: 'bold' }}> + </Text>
                    </TouchableOpacity>

                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.items}>
                <Text>Current Points</Text>
                <Text>{userData.sxPoints}</Text>
            </View>

            <TouchableOpacity onPress={() => setShow(true)} style={styles.date}>
                <Text style={styles.itemTitle}> {(date.toISOString().split('T')[0]).split('-').reverse().join('-')} </Text>
            </TouchableOpacity>

            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode='date'
                    display="default"
                    minimumDate={minDate}
                    onChange={(event, selectedDate) => {
                        const currentDate = selectedDate || date;
                        setShow(false)
                        setDate(currentDate)
                    }}
                />
            )}

            <Text style={styles.itemTitle}> Items to Order </Text>
            <View style={{ height: 300 }}>
                <FlatList
                    data={order}
                    renderItem={renderOrders}
                    keyExtractor={(item, index) => { return index.toString() }} />

            </View>
            <Text style={styles.itemTitle}> Total Points Consumed: {total} </Text>
            <Text style={styles.itemTitle}> Pick a Time</Text>
            <Picker
                selectedValue={whenOrder}
                style={{ height: 50, width: '100%', backgroundColor: '#fff', alignItems: 'center' }}
                onValueChange={(itemValue, itemIndex) => setWhenOrder(itemValue)}
                mode='dropdown'
            >
                <Picker.Item label="Select" value="-1" />
                <Picker.Item label="Breakfast" value="0" />
                <Picker.Item label="Lunch" value="1" />
                <Picker.Item label="Dinner" value="2" />
            </Picker>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => navigation.pop()}>
                    <Text style={styles.itemTitle}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => checkOrders(date)}>
                    <Text style={styles.itemTitle}>Confirm Choice</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    );

}

export default OrderandReview;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#D6D6D6",
    },
    items: {
        flexDirection: 'row',
        width: '100%',
        backgroundColor: '#fff',
        borderWidth: 1,
        padding: 10,
        justifyContent: 'space-between'
    },
    itemTitle: {
        textAlign: 'left',
        fontSize: 22,
        fontWeight: 'bold',
        fontStyle: "normal",

    },
    date: {
        backgroundColor: '#fff',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    }
});