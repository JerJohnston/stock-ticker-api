window.addEventListener('load', function(e){

// API Key and Url used to get data from the Alpha Vantage CLI
    
const searchURL = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&apikey=F7VCYFDO89HO5ZRP&symbol=';

// Get data function retrieves data from Alpha Vantage and returns the result in JSON format

    async function getData (stockSearch){
        let url = searchURL + stockSearch;
        const req = await fetch(url);
        const result = await req.json();
        return result;
    }

// 

    document.forms.search.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const stockData = getData(e.currentTarget.elements.symbolSearch.value);
        const stockTable = document.querySelector('.stock-data');
        
        stockData
        .then(res => {
            if(res['Error Message']){
                const error = `<p class="error">Invalid Symbol Input!</p>`
                document.querySelector('.errorMessage').innerHTML = error
            } else {
                const stockDisplay = `
            <table>
                <tbody>
                    <tr>
                        <td class="date">${res["Meta Data"]["3. Last Refreshed"]}</td>
                        <td class="symbol">${res["Meta Data"]["2. Symbol"]}</td>
                        <td class="price-open">${res["Time Series (Daily)"][Object.keys(res["Time Series (Daily)"])[0]]["1. open"]}</td>
                        <td class="price-high">${res["Time Series (Daily)"][Object.keys(res["Time Series (Daily)"])[0]]["2. high"]}&#x25B2;</td>
                        <td class="price-low">${res["Time Series (Daily)"][Object.keys(res["Time Series (Daily)"])[0]]["3. low"]}&#x25BC;</td>
                        <td class="price-close">${res["Time Series (Daily)"][Object.keys(res["Time Series (Daily)"])[0]]["4. close"]}</td>
                        <td class="volume">${res["Time Series (Daily)"][Object.keys(res["Time Series (Daily)"])[0]]["5. volume"]}</td>
                    </tr>
                </tbody>
            </table>
            `
            const docFragment = document.createRange().createContextualFragment(stockDisplay);
            const newStockData = docFragment.querySelector('table tr');

            stockTable.appendChild(newStockData);


            }
        })
        .catch(err => console.log(err))

    })

   
})