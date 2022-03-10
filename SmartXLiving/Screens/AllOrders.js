import { SafeAreaView, View, StyleSheet, Text, FlatList } from 'react-native';

const AllOrders = ({ navigation, route }) => {
    const { userOrders } = route.params;

    const renderOrders = ({ item }) => {
        return (
            <View style={{ height: 80, width: '95%', margin: 10, backgroundColor: '#fff' }}>
                <View style={{ alignItems: 'flex-end' }}>
                    <Text >Date: {(item.orderDate.split('T')[0]).split('-').reverse().join('-')}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
                    <Text>{item.menu.item}</Text>
                    <Text>{item.menu.portion}</Text>
                    <Text>{item.quantity}</Text>
                </View>
                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                    <View style={{ alignItems: 'flex-start' }}>
                        <Text>{item.whenOrder == 0 ? "Breakfast" : item.whenOrder == 1 ? "Lunch" : "Dinner"}</Text>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                        <Text>Points Consumned {item.quantity * item.menu.sxPoints}</Text>
                    </View>
                </View>
            </View>)
    }

    return (
        <SafeAreaView>
            <FlatList
                data={userOrders}
                renderItem={renderOrders}
                keyExtractor={(item, index) => String(index)}
            />

        </SafeAreaView>
    )
}

export default AllOrders;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D6D6D6'
    }
})