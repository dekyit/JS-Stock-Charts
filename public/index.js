async function main() {
  
    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');


    const endpoint = 'https://api.twelvedata.com/time_series?interval=1month&symbol=GME,MSFT,DIS,BNTX&apikey=34f3ac68e418454cb45715a04592ce9b'

    
    const response = await fetch(endpoint)
    const data = await response.json()

    function getColor(stock){
        if(stock === "GME"){
            return 'rgba(61, 161, 61, 0.7)'
        }
        if(stock === "MSFT"){
            return 'rgba(209, 4, 25, 0.7)'
        }
        if(stock === "DIS"){
            return 'rgba(18, 4, 209, 0.7)'
        }
        if(stock === "BNTX"){
            return 'rgba(166, 43, 158, 0.7)'
        }
    }

    function getHighest(values){
        let highest = 0
        values.forEach(value =>{
            if (value.high > highest){
                highest = value.high 
            } 
        }) 
        return highest
    }

    let GME = data.GME
    let MSFT = data.MSFT
    let DIS = data.DIS
    let BNTX = data.BNTX

    const stocks = [GME, MSFT, DIS, BNTX]

    stocks.forEach(stock => stock.values.reverse())
    
    new Chart(timeChartCanvas.getContext('2d'), {
        type: 'line',
        data: {
            labels: stocks[0].values.map(values => values.datetime),
            datasets: stocks.map(stock=> ({
                label: stock.meta.symbol,
                data: stock.values.map(value=> parseFloat(value.high)),
                backgroundColor: getColor(stock.meta.symbol),
                borderColor: getColor(stock.meta.symbol),
            }))
        },
    });
 
    new Chart(highestPriceChartCanvas.getContext('2d'), {
        type: 'bar',
        data: {
            labels: stocks.map(stock => stock.meta.symbol),
            datasets: [{
                label: 'Highest',
                data: stocks.map(stock=> (getHighest(stock.values)
                )),
                backgroundColor: stocks.map(stock=> (getColor(stock.meta.symbol)
                )),
                borderColor: stocks.map(stock=> (getColor(stock.meta.symbol)
                ))
            }]
        }
    });
    
 

    // console.log(stocks[0])
}


main()