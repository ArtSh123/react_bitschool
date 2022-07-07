// import logo from './logo.svg';
import './App.css';
import Comp1 from './components/Comp1';
import Comp2 from './components/Comp2';
import Counter from './components/Counter';
import Input from './components/Input';
import Product from './components/Product';

const Greeting = (props) => {
  return (
    <div>
      <h4><a href={props.href}>Hello, I'm a functional component.</a></h4>
    </div>
  );
}

const User = (props) => {
  return (
    <div>
      <h5>Hello <Name name={props.name} /> <Surname surname={props.surname || "'no surname'"} />. Age - {props.age}</h5>
    </div>
  );
}

const Name = (props) => {
  return (
    <span>{props.name}</span>
  );
}

const Surname = (props) => {
  return (
    <span>{props.surname}</span>
  );
}

const fruits = [
  {
    name: 'apple',
    price: '2',
    description: 'Apples description',
  },
  {
    name: 'banana',
    price: '1.3',
    description: 'Bananas description',
  },
  {
    name: 'orange',
    price: '4.1',
    description: 'Oranges description',
  },
  {
    name: 'lemon',
    price: '0.7',
    description: 'Lemons description',
  }
];

function App() {

  const fruitsList = fruits.map((fruit, index) => {
    return  <Product 
              key={index}
              name={fruit.name} 
              price={Number(fruit.price).toFixed(2)} 
              description={fruit.description} 
            />
  })

  // const li = fruits.map((fruit, index) => {
  //   return <li key={index}>{fruit}</li>;
  // })

  // const li = [
  //   <li key={0}>{fruits[0]}</li>,
  //   <li key={1}>{fruits[1]}</li>,
  //   <li key={2}>{fruits[2]}</li>,
  //   <li key={3}>{fruits[3]}</li>
  // ];

  return (
    <div className="App">
      <Input />

      {fruitsList}

      {/* <Product name="banabas" price="1.00" description="Fresh bananas from Ecuador" />
      <Product name="apple" price="0.50" description="Fresh apple from Armenia" />

      <Greeting 
        href="https://google.com" 
      />
      <User 
        name="John" 
        surname="Doe" 
        age={25} 
      />
      <User 
        name="Alex" 
        age={30} 
      />
      <Comp1 />
      <Comp2 />

      <Counter defaultValue={0} /> */}
    </div>
  );
}

export default App;
