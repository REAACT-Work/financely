import React, { useState } from 'react';
import Header from '../components/Header';
import Cards from '../components/Cards';
import AddExpenseModal from '../components/Modals/addExpense';
import AddIncomeModal from '../components/Modals/addIncome';

const Dashboard = () => {
  const [isExpenseModalVisible,setisExpenseModalVisible]=useState(false);
  const [isIncomeModalVisible,setIsIncomeModalVisible]=useState(false);
  const showExpenseModal=()=>{
    setisExpenseModalVisible(true);
  }
  const showIncomeModal=()=>{
    setIsIncomeModalVisible(true);
  }
  const handleExpenseCancel=()=>{
    setisExpenseModalVisible(false);
  }
  const handleIncomeCancel=()=>{
    setIsIncomeModalVisible(false);
  };

  const onFinish=(values,type)=>{
    console.log("onFinish",values,type);
  }
  return (
    <div>
      <Header/>
      <Cards 
      showExpenseModal={showExpenseModal}
      showIncomeModal={showIncomeModal}
      />
      <AddExpenseModal
      isExpenseModalVisible={isExpenseModalVisible}
      handleExpenseCancel={handleExpenseCancel}
      onFinish={onFinish}
      />
      <AddIncomeModal
      isIncomeModalVisible={isIncomeModalVisible}
      handleIncomeCancel={handleIncomeCancel}
      onFinish={onFinish}
      /> 
    </div>
  )
}

export default Dashboard
