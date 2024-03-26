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
import TransactionTable from '../components/Transactiontable';
import ChartComponents from '../components/Charts';
import NoTransaction from '../components/NoTransaction';
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
  const [income,setIncome]=useState(0);
  const [expense,setExpense]=useState(0);
  const [totalBalance,setTotalBalance]=useState(0);
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
      date:values.date.format("YYYY-MM-DD"),
      amount: parseFloat(values.amount),
      tag:values.tag,
      name:values.name,
    };
    addTransaction(newTransaction);
  };

  async function addTransaction(transaction,many){
    // Add the doc
    try{
      const docRef=await addDoc(
        collection(db, `users/${user.uid}/transactions`),
        transaction
      );
      console.log("Document written with Id:",docRef.id);
        if (!many) toast.success("Transaction Added");
        let newArr=transactions;
        newArr.push(transaction);
        setTransactions(newArr);
        calculateBalance();
    }
    catch(e){
      console.e("Error adding document: ", e);
        if (!many) toast.error("Error Adding Transaction")
    }
  }

  useEffect(()=>{
    fetchTransactions();
  },[user]);

  useEffect(()=>{
    calculateBalance();
  },[transactions]);

  function calculateBalance(){
    let incomeTotal=0;
    let expensesTotal=0;

    transactions.forEach((transaction)=>{
      if(transaction.type==="income"){
        incomeTotal+=transaction.amount;
      }
      else{
        expensesTotal+=transaction.amount;
      }
    });

    setIncome(incomeTotal);
    setExpense(expensesTotal);
    setTotalBalance(incomeTotal-expensesTotal);
  };

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

  let sortedTransactions= transactions.sort((a,b)=>{
    
      return new Date(a.date) - new Date(b.date);
  })

  return (
    <div>
      <Header/>
      {loading? (
      <p>Loading...</p>
      ) : (
      <>
      <Cards 
      income={income}
      expense={expense}
      totalBalance={totalBalance}
      showExpenseModal={showExpenseModal}
      showIncomeModal={showIncomeModal}
      />
      {transactions.length!=0?(
      <ChartComponents sortedTransactions={sortedTransactions}/>
      ):(
      <NoTransaction/>
      )}
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
      <TransactionTable transactions={transactions}
      addTransaction={addTransaction}
      fetchTransactions={fetchTransactions}
      />
      </>
      )}
    </div>
  );
}

export default Dashboard
