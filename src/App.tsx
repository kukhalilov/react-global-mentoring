import React, { useState } from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <ComponentWithCreateElement />
      <Counter />
      <PureComponentExample />
      <SearchForm />        
    </div>
  );
}

// a component using React.createElement
function ComponentWithCreateElement() {
  return React.createElement('h2', { className: 'App' }, 'This is a component using React.createElement');
}

// a counter component using React.Component
type CounterProps = Record<string, unknown>;

type CounterState = {
  count: number;
}

class Counter extends React.Component<CounterProps, CounterState> {
  constructor(props: any) {
    super(props);
    this.state = { count: 0 };
  }

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  }

  decrement = () => {
    this.setState({ count: this.state.count - 1 });
  }

  reset = () => {
    this.setState({ count: 0 });
  }

  render() {
    return (
      <div>
        <h2>Counter</h2>
        <p>Count: {this.state.count}</p>
        <button onClick={this.increment}>Increment</button>
        <button onClick={this.decrement}>Decrement</button>
        <button onClick={this.reset}>Reset</button>
      </div>
    );
  }
}

// a component using React.PureComponent
type PureComponentExampleProps = Record<string, unknown>;

type PureComponentEcxampleState = {
  name: string
}

class PureComponentExample extends React.PureComponent<PureComponentExampleProps, PureComponentEcxampleState> {
  constructor(props: PureComponentExampleProps | Readonly<PureComponentExampleProps>) {
    super(props)
  
    this.state = {
       name: "John Doe"
    }
  }

/* changing state every second with the same value
in this case the component will not re-render as it is a PureComponent
and the name is a primitive value */
componentDidMount(): void {
    setInterval(() => {
      this.setState({name: "John Doe"})
    }, 1000);
  }

  render(): React.ReactNode {
      return (
        <div>
          <h2>Pure Component Example</h2>
          <p>His name is {this.state.name}</p>
        </div>
      )
  }
}

// A search form with a functional component
function SearchForm() {
  const [searchValue, setSearchValue] = useState('');
  const [searchText, setSearchText] = useState('')

  const handleSearch = () => {
    setSearchText(searchValue);
  }

  return (
    <div>
      <h2>Search Form</h2>
      <input type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
      <p>You searched for: {searchText}</p>
    </div>
  );
}

export default App;
