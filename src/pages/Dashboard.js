import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Cards from '../components/Cards';
import AddExpenseModal from '../components/Modals/addExpense';
import AddIncomeModal from '../components/Modals/addIncome';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import moment from 'moment';
import { auth, db } from '../firebase';
import { addDoc,collection, getDocs, query } from 'firebase/firestore';
const Dashboard = () => {
  // const transaction=[
  //   {
  //     type:"expense",
  //     amount:800,
  //     tag:"salary",
  //     name:"expense 1",
  //     date:"2021-01-01",
  //   },
  //   {
  //     type:"income",
  //     amount:1200,
  //     tag:"salary",
  //     name:"income 1",
  //     date:"2021-01-01",
  //   },
  // ];

  const [transactions,setTransactions]=useState([]);
  const [loading,setLoading]=useState(false);
  const [user]=useAuthState(auth);
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
    const newTransaction={
      type:type,
      date:moment(values.date).format("YYYY-MM-DD"),
      amount: parseFloat(values.amount),
      tag:values.tag,
      name:values.name,
    };
    addTransaction(newTransaction);
  };

  async function addTransaction(transaction){
    // Add the doc
    try{
      const docRef=await addDoc(
        collection(db, `users/${user.uid}/transactions`),
        transaction
      );
      console.log("Document written with Id:",docRef.id);
        toast.success("Transaction Added")
    }
    catch(e){
      console.e("Error adding document: ", e);
        toast.error("Error Adding Transaction")
    }
  }

  useEffect(()=>{
    fetchTransactions();
  },[]);

  async function fetchTransactions(){
    setLoading(true);
    if(user){
      const q=query(collection(db,`users/${user.uid}/transactions`));
      const querySnapshot=await getDocs(q);
      let transactionArray=[];
      querySnapshot.forEach((doc)=>{
        transactionArray.push(doc.data());
      });
      setTransactions(transactionArray);
      console.log("Transaction Array", transactionArray);
      toast.success("Transactions Fetched")
    }
    setLoading(false);
  }

  return (
    <div>
      <Header/>
      {loading? (
      <p>Loading...</p>
      ) : (
      <>
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
      /> </>
      )}
    </div>
  );
}

export default Dashboard
