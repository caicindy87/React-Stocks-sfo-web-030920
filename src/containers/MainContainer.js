import React, { Component } from "react";

import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "../components/SearchBar";

class MainContainer extends Component {
  state = {
    stocks: [],
    purchasedStocks: [],
    displayStocks: [],
  };

  componentDidMount() {
    fetch("http://localhost:3000/stocks")
      .then((resp) => resp.json())
      .then((data) =>
        this.setState({
          stocks: data,
          displayStocks: data,
        })
      );
  }

  purchaseStock = (purchasedStock) => {
    this.setState((prevState) => ({
      purchasedStocks: [...prevState.purchasedStocks, purchasedStock],
    }));
  };

  sellStock = (soldStock) => {
    const portfolioStocks = this.state.purchasedStocks.filter(
      (stock) => stock.id !== soldStock.id
    );

    this.setState({
      purchasedStocks: portfolioStocks,
    });
  };

  handleFilter = (e) => {
    const { stocks } = this.state;
    const type = e.target.value;

    if (type === "") {
      this.setState({
        displayStocks: stocks,
      });
    } else {
      const filteredStocks = stocks.filter((stock) => stock.type === type);
      this.setState({
        displayStocks: filteredStocks,
      });
    }
  };

  handleSort = (e) => {
    const sortOption = e.target.value;
    const { displayStocks } = this.state;
    let arr = [];

    switch (sortOption) {
      case "Alphabetically":
        arr = displayStocks.sort((a, b) => (a.name > b.name ? 1 : -1));
        break;
      case "Price":
        arr = displayStocks.sort((a, b) => (a.price > b.price ? 1 : -1));
        break;
      default:
        console.log("wrong choice");
    }

    this.setState((prevState) => ({
      displayStocks: arr,
    }));
  };

  render() {
    return (
      <div>
        <SearchBar
          handleFilter={this.handleFilter}
          handleSort={this.handleSort}
        />

        <div className="row">
          <div className="col-8">
            <StockContainer
              stocks={this.state.displayStocks}
              purchaseStock={this.purchaseStock}
            />
          </div>
          <div className="col-4">
            <PortfolioContainer
              myStocks={this.state.purchasedStocks}
              sellStock={this.sellStock}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default MainContainer;
