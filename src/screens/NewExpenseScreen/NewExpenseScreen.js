import { View, Modal, StyleSheet, ScrollView, SafeAreaView, KeyboardAvoidingView } from 'react-native'
import React from 'react'
import HorizontalStart from '../../components/HorizontalStart/HorizontalStart';
import NewExpense from '../../components/NewExpense/NewExpense';
import CategoryHelp from '../../components/CategoryHelp/CategoryHelp';

const NewExpenseScreen = ({ isModalOpen, setIsModalOpen }) => {

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'black'}}>
      <Modal 
        style={styles.modal} 
        transparent={false} 
        onRequestClose={() => setIsModalOpen(false)} 
        statusBarTranslucent={false} 
        presentationStyle={'pageSheet'} 
        visible={isModalOpen} 
        animationType={'slide'}>
        <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? "padding" : "height"}
        style={{flex: 1}}
        keyboardVerticalOffset={0}
        >
        <ScrollView keyboardShouldPersistTaps='handled' style={styles.modalContent}>
          <HorizontalStart />
          <NewExpense isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
          <View style={styles.categoryHelpContainer}>
            <CategoryHelp />
          </View>
        </ScrollView>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  )
}

let styles = StyleSheet.create({
  modalContent: {
    backgroundColor: 'rgba(0, 0, 0, 1)',
    borderWidth: 0.5,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
    width: '100%',
  },
  categoryHelpContainer: {
    padding: 15,
  },

});

export default NewExpenseScreen