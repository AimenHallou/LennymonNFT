import React, { useEffect} from "react";
import './App.css';
import { useDispatch,useSelector} from "react-redux";
import {connect} from "./redux/blockchain/blockchainActions"
import {fetchData} from "./redux/data/dataActions";
import * as s from "./styles/globalStyles";


function App() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  
  console.log(data);


  const mintNFT = (_account, _name) => {
    blockchain.lennyToken.methods.createRandomLenny(_name).send({from: _account, value: 100000000000000}).once("error", (err) =>{
      console.log(err)
    }).then((receipt) => {
      console.log(receipt);
      dispatch(fetchData(blockchain.account));
    });
  }


  //console.table(blockchain);

  useEffect(() => {
    if (blockchain.account != null) {
      console.log(blockchain.account)
      dispatch(fetchData(blockchain.account));
    }
  }, [blockchain.lennyToken]);

  return (
    <s.Screen >
        <s.Container ai={"center"}>
        <s.TextTitle>Make sure you're connected to the Kovan Test Network!</s.TextTitle>
        </s.Container>
      {blockchain.account === "" || blockchain.lennyToken === null ?(
        <s.Container flex={1} ai={"center"} jc={"center"}>
        <s.TextTitle>Connect to the game</s.TextTitle>
        <s.SpacerXSmall/>
        <button onClick={(e)=> {
            e.preventDefault();
            dispatch(connect());
        }}>Connect</button>
      </s.Container>
      ):( <s.Container ai={"center"} style={{padding:"24px"}}>
        <s.TextTitle>Welcome to the game</s.TextTitle>
        <s.SpacerSmall/>
        <button onClick={(e)=> {
            e.preventDefault();
            mintNFT(blockchain.account, "Unknown");
        }}>Create NFT Lenny</button>
        <s.SpacerSmall/>
        

        <s.Container jc={"space-between"} fd={"row"} style={{flexWrap: "wrap"}}>
        {data.allLenny.map(item => {
          return (
            <>
          <s.Container>
            <s.TextDescription>ID: {item.id}</s.TextDescription>
            <s.TextDescription>DNA: {item.dna}</s.TextDescription>
            <s.TextDescription>LEVEL: {item.level}</s.TextDescription>
            <s.TextDescription>NAME: {item.name}</s.TextDescription>
            <s.TextDescription>RARITY: {item.rarity}</s.TextDescription>
          </s.Container>
          <s.SpacerSmall/>
          </>
          );
          })}
        </s.Container>
          



      </s.Container>
      )}
    </s.Screen>
  )
}


export default App;