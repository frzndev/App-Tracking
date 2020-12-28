import { StyleSheet } from "react-native";

const css = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    container2: {
        flex: 1,
        flexDirection:'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    containerTop: {
        justifyContent: 'flex-start'
    },

    darkbg:{
        backgroundColor:"#333"
    },

    button_home: {
        marginRight: 50
    },

    login_msg:(text='none') => ({
        fontWeight:"bold",
        fontSize: 22,
        color:"red",
        marginTop: 10,
        marginBottom: 15,
        display: text
    }),

    login_form: {
        width: "80%"
    },
    
    login_input: {
        backgroundColor:"#fff",
        fontSize: 19,
        padding: 7, 
        marginBottom: 15
    },

    login_button: {
        padding: 12,
        backgroundColor:"#F58634",
        alignSelf:"center",
        borderRadius:5
    },

    login_buttonText:{
        fontWeight:"bold",
        fontSize: 22,
        color:"#333"
    },

    area_tab: {
        backgroundColor: "#333",
        fontSize: 20,
        fontWeight: "bold",
        color: "#333"
    },

    area_menu: {
        flexDirection: 'row',
        paddingTop: 40,
        paddingBottom: 10,
        width: '100%',
        backgroundColor: '#111',
        alignItems:'center',
        justifyContent: 'center'
    },

    area_title: {
        width: '80%',
        fontWeight: 'bold',
        fontSize: 20,
        color: '#fff',
        textAlign: 'center'
    },

    button_home2: {
        textAlign: 'left'
    },

    button_logout: {
        textAlign: 'right'
    }

});

export {css};