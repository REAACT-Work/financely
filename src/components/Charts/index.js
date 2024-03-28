import React from 'react'
import "./style.css"
import { Line, Pie } from "@ant-design/charts"

function ChartComponents({sortedTransactions}) {
    const data =sortedTransactions.map((item)=>{
        return { date:item.date, amount: item.amount};
    });

    const spendingData=sortedTransactions.filter((transaction)=>{
    if (transaction.type =="expense"){
            return{ tag:transaction.tag, amount:transaction.amount};
        }
});

let finalSpendings=spendingData.reduce((acc,obj)=>{
    let key=obj.tag;
    if(!acc[key]){
        acc[key]={tag:obj.tag, amount:obj.amount};
    }else{
        acc[key].amount+=obj.amount;
    }
    return acc;
},{});

let newSpendings=[
    {tag:"food",amount:0},
    {tag:"education",amount:0},
    {tag:"office",amount:0},
];
spendingData.forEach((item)=>{
    if(item.tag=="food"){
        newSpendings[0].amount += item.amount;
    }else if(item.tag=="education"){
        newSpendings[1].amount+=item.amount;
    }else{
        newSpendings[2].amount+=item.amount;
    }

});
    const config={
        data:data,
        width:500,
        height:350,
        autoFit:true,
        xField: 'date',
        yField: 'amount',
        point:{
            visible:true,
            shape: 'diamond',
            size: 5,
        },
    };
    const spendingConfig={
        data:newSpendings,
        width:200,
        height:300,
        angleField:"amount",
        colorField:"tag",
    };
    let chart;
    let pieChart;
    return (
        <div className='charts-wrapper '>
            <div className='chart-card'>
                <h2 style={{marginTop:0}}>Your Analytics</h2>
            <Line
             {...config} onReady={(chartInstance)=>(chart=chartInstance)} />
            </div>
            <div className='chart-cards'>
                <h2>Your Spendings</h2>
                <Pie {...spendingConfig}
                onReady={(chartInstance)=>(pieChart=chartInstance)}
                />
            </div>
        </div>
  );
}

export default ChartComponents
