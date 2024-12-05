<template>

    <div class="miniSection" :style="{width: '49em', padding: '2em 1.5em', backgroundColor: 'white', display: 'flex',
    flexDirection: 'column', gap: '1em'}">
        <h3>{{ arrivalTextHeader }}</h3>

        <div v-for="product in products" :key="product.id" :style="{display: 'flex', gap: '1.5em'}">

            <div class="miniSection" :style="{width: '50%', backgroundColor: '#ededed', padding: '1em 2em', display: 'flex',
            flexDirection: 'column'}">

                <div :style="{display: 'flex', gap: '1.25em'}">
                    <img :src="product.productImage" :style="{height: '8em', width: '8em', objectFit:'contain', pointerEvents: 'none'}"/>
                    <div :style="{display: 'flex', flexDirection: 'column', fontSize:'0.89em', marginTop:'-1em'}">
                        <p :style="{maxWidth:'88%'}">{{ product.productName }}</p>
                        <b :style="{marginTop:'-0.5em'}">{{ product.productPrice }} <span v-if="product.productPricePerUnit!==null">({{ product.productPricePerUnit }})</span></b>
                        <div v-if="hasPremium" :style="{display: 'flex', alignItems: 'end'}">
                            <img :src="checkmark" :style="{height: '1.5em', width: '1.3em', pointerEvents: 'none'}"/>
                            <b :style="{color: '#2d9aed'}">premium</b>
                        </div>
                    </div>
                </div>

                <b v-if="product.status==='Out of stock'" :style="{color: 'white', backgroundColor: '#d14750', padding: '0.3em 0.3em', width: '6.3em', marginTop:'1em', fontSize:'0.88em'}">Out of Stock</b>
                <b v-if="product.status==='Does not deliver to selected address'" :style="{color: 'white', backgroundColor: '#d14750', padding: '0.3em 0.3em', fontSize:'0.95em', width: '18em', marginTop:'3em', fontSize:'0.88em'}">Does not deliver to selected address</b>
                <b v-if="product.status==='Does not deliver to selected pickup-location'" :style="{color: 'white', backgroundColor: '#d14750', padding: '0.3em 0.3em', fontSize:'0.95em', width: '21em', marginTop:'3em', fontSize:'0.88em'}">Does not deliver to selected pickup-location</b>

                <p v-if="product.status==='Available' && product.deals.length>0" :style="{fontSize:'0.88em', marginBottom:'0em', marginTop:'2em', lineHeight:'2'}">
                    Deal Selected: <span v-if="(hasPremium==false && product.deals[0].requirement==='PREMIUM')==false" :style="{padding: '0.5em 0.5em', color: 'white', fontWeight: 'bold', backgroundColor:'#b81220', fontSize: '0.8em', marginRight:'1em'}">{{ formatProductDealText(product.deals[0]) }}</span> <span v-if="(hasPremium==false && product.deals[0].requirement==='PREMIUM')" :style="{marginRight: '1em'}">None</span>
                
                    <template v-if="product.deals[0].prices.length==3 && (hasPremium==false && product.deals[0].requirement==='PREMIUM')==false">
                        <span :style="{textDecoration: 'line-through', color: 'gray'}">{{ product.deals[0].prices[0] }}</span>
                        <span :style="{color: 'green', fontSize:'1.2em', fontWeight: 'bold', marginLeft:'0.5em'}">{{ product.deals[0].prices[1] }}</span>
                    </template>

                    <select @input="onChangingSelectedProductDeal(product.id, product.deals[0])" :style="{padding: '0.3em 0.3em', fontSize:'0.9em'}">
                        <option value="">Select A Different Deal</option>
                        <option v-for="(deal, index) in product.deals" :key="index" :value="formatProductDealText(deal)">{{ formatProductDealText(deal) }}</option>
                    </select>
                </p>

                <p :style="{fontSize:'0.88em', marginBottom:'0em'}">
                    <b>Quantity:</b> {{ product.quantity }}
                    <select v-if="product.status==='Available'" @input="onChangingQuantity(product.id, product.quantity)" :style="{marginLeft:'1em', padding: '0.3em 0.3em'}">
                        <option value="">Change</option>
                        <option value="0">0 (Delete this item)</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="13">13</option>
                        <option value="14">14</option>
                        <option value="15">15</option>
                        <option value="16">16</option>
                        <option value="17">17</option>
                        <option value="18">18</option>
                        <option value="19">19</option>
                        <option value="20">20</option>
                        <option value="21">21</option>
                        <option value="22">22</option>
                        <option value="23">23</option>
                        <option value="24">24</option>
                        <option value="25">25</option>
                        <option value="26">26</option>
                        <option value="27">27</option>
                        <option value="28">28</option>
                        <option value="29">29</option>
                        <option value="30">30</option>
                        <option value="31">31</option>
                        <option value="32">32</option>
                        <option value="33">33</option>
                        <option value="34">34</option>
                        <option value="35">35</option>
                        <option value="36">36</option>
                        <option value="37">37</option>
                        <option value="38">38</option>
                        <option value="39">39</option>
                        <option value="40">40</option>
                        <option value="41">41</option>
                        <option value="42">42</option>
                        <option value="43">43</option>
                        <option value="44">44</option>
                        <option value="45">45</option>
                        <option value="46">46</option>
                        <option value="47">47</option>
                        <option value="48">48</option>
                        <option value="49">49</option>
                        <option value="50">50</option>
                        <option value="51">51</option>
                        <option value="52">52</option>
                        <option value="53">53</option>
                        <option value="54">54</option>
                        <option value="55">55</option>
                        <option value="56">56</option>
                        <option value="57">57</option>
                        <option value="58">58</option>
                        <option value="59">59</option>
                        <option value="60">60</option>
                        <option value="61">61</option>
                        <option value="62">62</option>
                        <option value="63">63</option>
                        <option value="64">64</option>
                        <option value="65">65</option>
                        <option value="66">66</option>
                        <option value="67">67</option>
                        <option value="68">68</option>
                        <option value="69">69</option>
                        <option value="70">70</option>
                        <option value="71">71</option>
                        <option value="72">72</option>
                        <option value="73">73</option>
                        <option value="74">74</option>
                        <option value="75">75</option>
                        <option value="76">76</option>
                        <option value="77">77</option>
                        <option value="78">78</option>
                        <option value="79">79</option>
                        <option value="80">80</option>
                        <option value="81">81</option>
                        <option value="82">82</option>
                        <option value="83">83</option>
                        <option value="84">84</option>
                        <option value="85">85</option>
                        <option value="86">86</option>
                        <option value="87">87</option>
                        <option value="88">88</option>
                        <option value="89">89</option>
                        <option value="90">90</option>
                        <option value="91">91</option>
                        <option value="92">92</option>
                        <option value="93">93</option>
                        <option value="94">94</option>
                        <option value="95">95</option>
                        <option value="96">96</option>
                        <option value="97">97</option>
                        <option value="98">98</option>
                        <option value="99">99</option>
                    </select>
                </p>
                
                <p v-for="optionKey in Object.keys(product.productOptions)" :key="optionKey" :style="{fontSize:'0.88em', marginBottom:'0em'}"><b>{{ optionKey }}:</b> <span :style="{color: 'gray'}">{{ product.productOptions[optionKey] }}</span></p>
            </div>

            <div v-if="selectedDestination!==null && product.status==='Available'" :style="{display: 'flex', flexDirection: 'column'}">
                <form @change="productDeliveryScheduleTypeChanged(product)">
                    <input v-model="this.productScheduleTypes[product.id]" type="radio" name="scheduleDelivery" value="default" :style="{marginBottom:'1em'}" checked><b>{{ formatArrivalText() }}</b><br>
                    <input v-model="this.productScheduleTypes[product.id]" type="radio" name="scheduleDelivery" value="scheduleLater">Schedule <b>later</b><br>
                </form>

                <template v-if="this.productScheduleTypes[product.id]==='scheduleLater'">
                    <div :style="{position: 'relative', marginTop:'1em', marginBottom:'-1em', cursor: 'pointer'}">
                        <p><b>Selected:</b>  {{ productSchedules[product.id] == null ? 'None' : productSchedules[product.id][0] + ", " + productSchedules[product.id][1]}}</p>

                        <p v-if="productSchedules[product.id]!==null && productSchedules[product.id][2][0]==='-'" :style="{color: 'darkgreen', position: 'absolute', left: '130%', top: '0%', cursor: 'pointer'}">{{ getTotalPriceDifferenceWithQuantity(productSchedules[product.id][2], product.quantity) }}</p>
                        <p v-if="productSchedules[product.id]!==null && productSchedules[product.id][2][0]==='+'" :style="{color: '#bf2a40', position: 'absolute', left: '130%', top: '0%', cursor: 'pointer'}">{{ getTotalPriceDifferenceWithQuantity(productSchedules[product.id][2], product.quantity) }}</p>
                    </div>

                    <b v-if="productToDisplayOtherSchedulingOptionsMappings[product.id]==true" @click="toggleDisplayOtherSchedulingOptions(product)" :style="{marginTop:'1em', cursor: 'pointer'}">Hide other options</b>
                    <b v-else @click="toggleDisplayOtherSchedulingOptions(product)" :style="{marginTop:'1em', cursor: 'pointer'}">Show other options</b>

                    <template v-if="productToDisplayOtherSchedulingOptionsMappings[product.id]==true">
                        <br/>
                        <div v-for="(schedulingOption, index) in productToOtherSchedulingOptionsMappings[product.id]" :key="schedulingOption.monthAndDay"
                        @click="updateScheduleAheadDate(product, index)"
                        :style="{position: 'relative', cursor: 'pointer',
                        fontSize:'0.9em'}">
                            <template v-if="productSchedules[product.id]==null || schedulingOption.monthAndDay!==productSchedules[product.id][1]">
                                <p><b>{{ schedulingOption.weekday }},</b> {{ schedulingOption.monthAndDay }}</p>
                                <p></p>

                                <p v-if="schedulingOption.priceDifference[0]==='+'" :style="{color: '#bf2a40', position: 'absolute', left: '130%', top: '0%'}">{{ getTotalPriceDifferenceWithQuantity(schedulingOption.priceDifference, product.quantity) }}</p>
                                <p v-else :style="{color: 'darkgreen', position: 'absolute', left: '130%', top: '0%'}">{{ getTotalPriceDifferenceWithQuantity(schedulingOption.priceDifference, product.quantity) }}</p>
                            </template>
                        </div>
                    </template>
                    
                </template>
                
            </div>

        </div>

    </div>

</template>

<script>
import checkmark from '@/assets/images/checkmark.png';
import showerCurtains from '@/assets/images/showerCurtains.jpg';

    export default {

        props: {
            arrivalTextHeader: String,
            getItAsSoonAs: Number,
            hasPremium: Boolean,
            products: Array,
            deliveryAreaCountry: String,
            selectedDestination: Object
        },

        mounted() {
            this.getDefaultWeekdayMonthDayAndYear();

            for(let product of this.products) {
                this.productScheduleTypes[product.id] = 'default';
                this.productSchedules[product.id] = [this.defaultWeekday, this.defaultMonthAndDay, '-0', this.defaultYear];
                this.productToDisplayOtherSchedulingOptionsMappings[product.id] = false;
            }
        },

        data() {
            return {
                showerCurtains,
                checkmark,
                productScheduleTypes: {}, //keys are the ids(not product-id, but cart-item-id) and values are either 'default' or 'scheduleLater'
                productSchedules: {}, //keys are ids(not product-id, but cart-item-id) and values are either [this.defaultWeekday, this.defaultMonthAndDay, '-0', this.defaultYear](if default) or something like this otherwise: ['Thurs, Nov 28', '+12', 2024]
                productToDisplayOtherSchedulingOptionsMappings: {}, //keys are ids(not product-id, but cart-item-id) and values are booleans that are true if other scheduling options are shown, false otherwise
                productToOtherSchedulingOptionsMappings: {}, //keys are ids(not product-id, but cart-item-id) and values are lists of scheduling options available for the product upto 5 days ahead of the default scheduled date.
                defaultWeekday: "",
                defaultMonthAndDay: "",
                defaultYear: "",
                countryCurrencyMap: {
                    "the United States": "$", // USD - US Dollar
                    "Australia": "A$",     // AUD - Australian Dollar
                    "Canada": "C$",        // CAD - Canadian Dollar
                    "China": "CN¥",          // CNY - Chinese Yuan
                    "Germany": "€",        // EUR - Euro
                    "India": "₹",          // INR - Indian Rupee
                    "Japan": "¥",          // JPY - Japanese Yen
                    "Mexico": "MX$",         // MXN - Mexican Peso
                    "United Kingdom": "£"  // GBP - British Pound
                },
                currencyToDollarMap: {
                    "$": 1,            // USD - United States
                    "A$": 1.5063,        // AUD - Australian Dollar
                    "C$": 1.3855,        // CAD - Canadian Dollar
                    "¥": 151.88,       // JPY - Japanese Yen (for Japan)
                    "₹": 84.079,        // INR - Indian Rupee (for India)
                    "€": 0.9240,         // EUR - Euro (for Germany)
                    "CN¥": 7.1198,   // CNY - Chinese Yuan (for China)
                    "MX$": 19.86,      // MXN - Mexican Peso (for Mexico)
                    "£": 0.7709          // GBP - British Pound (for United Kingdom)
                }
            }
        },

        methods: {
            formatArrivalText() {
                const currentDate = new Date();
                
                const arrivalDate = new Date(currentDate.getTime() + this.getItAsSoonAs * 60 * 60 * 1000);

                const currentDay = currentDate.toDateString();
                const arrivalDay = arrivalDate.toDateString();

                const dayOptions = { weekday: 'long', month: 'short', day: 'numeric' };

                if (currentDay === arrivalDay) {
                    const hours = Math.floor(this.getItAsSoonAs);
                    const minutes = Math.floor((this.getItAsSoonAs % 1) * 60);
                    return minutes > 0
                        ? `Today in ${hours} hrs ${minutes} mins`
                        : `Today in ${hours} hrs`;
                }

                const tomorrow = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000).toDateString();
                if (arrivalDay === tomorrow) {
                    return `Tomorrow, ${arrivalDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
                }

                return arrivalDate.toLocaleDateString('en-US', dayOptions);
            },

            onChangingQuantity(id, quantity) {
                if(event.target.value==="" || quantity===parseInt(event.target.value)) {
                    return;
                }
                this.$emit("updateItemQuantity",
                    {
                        id: id,
                        arrivalTextHeader: this.arrivalTextHeader,
                        newQuantity: parseInt(event.target.value)
                    }
                );
            },

            formatProductDealText(productDealInfo) {
                if(productDealInfo.requirement==='NONE') {
                    return `FOR EVERYBODY: ${productDealInfo.discount}`;
                }
                else if(productDealInfo.requirement==='PREMIUM') {
                    return `PREMIUM ONLY: ${productDealInfo.discount}`;
                }
                else {
                    return `FROM PROMO-CODE: ${productDealInfo.discount}`;
                }
            },

            onChangingSelectedProductDeal(id, firstProductDeal) {
                if(event.target.value==="") {
                    return;
                }
                if(this.formatProductDealText(firstProductDeal)===event.target.value) {
                    return
                }
                this.$emit("updateSelectedProductDeal",
                    {
                        id: id,
                        arrivalTextHeader: this.arrivalTextHeader,
                        newlySelectedProductDeal: event.target.value,
                    }
                );
            },

            toggleDisplayOtherSchedulingOptions(product) {
                this.productToDisplayOtherSchedulingOptionsMappings[product.id] = !this.productToDisplayOtherSchedulingOptionsMappings[product.id];
                if(product.id in this.productToOtherSchedulingOptionsMappings==false) {
                    this.getLaterDeliveryOptions(product);
                }
            },

            async getLaterDeliveryOptions(product) {
                const currency = this.countryCurrencyMap[this.deliveryAreaCountry];

                let defaultSHDPrice = parseFloat(product.shippingAndHandlingPrice.substring(currency.length));
                let defaultTax = parseFloat(product.tax.substring(currency.length));
                let defaultSHDPriceSavedWithPremium = 0;
                if(this.hasPremium) {
                    defaultSHDPriceSavedWithPremium = parseFloat(product.shdPriceSavedWithPremium.substring(currency.length));
                }

                if(currency!=="$") {
                    defaultSHDPrice/=this.currencyToDollarMap[currency];
                    defaultSHDPrice*=this.currencyToDollarMap["$"];
                    defaultSHDPrice = defaultSHDPrice.toFixed(2);

                    defaultTax/=this.currencyToDollarMap[currency];
                    defaultTax*=this.currencyToDollarMap["$"];
                    defaultTax = defaultTax.toFixed(2);

                    if(this.hasPremium) {
                        defaultSHDPriceSavedWithPremium/=this.currencyToDollarMap[currency];
                        defaultSHDPriceSavedWithPremium*=this.currencyToDollarMap["$"];
                        defaultSHDPriceSavedWithPremium = defaultSHDPriceSavedWithPremium.toFixed(2);
                    }
                }

                const postRequestBody = {
                    productId: product.productId,
                    defaultDeliveryDate: [this.defaultWeekday, this.defaultMonthAndDay, this.defaultYear],
                    defaultSHDPrice: defaultSHDPrice,
                    defaultTax: defaultTax
                };
                if(this.hasPremium) {
                    postRequestBody.defaultSHDPriceSavedWithPremium = defaultSHDPriceSavedWithPremium;
                }
                if(this.selectedDestination.type==='delivery') {
                    postRequestBody.destinationAddress = this.selectedDestination.data.addressText;
                }
                else {
                    postRequestBody.destinationAddress = this.selectedDestination.data.pickupLocationAddress;
                }
                
                const response = await fetch('http://localhost:8029/getLaterSchedulingOptionsForProduct', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(postRequestBody)
                });
                if(!response.ok) {
                    throw new Error('Network response not ok');
                }
                let laterSchedulingOptionsForProduct = await response.json();
                /*
                    above is a list of 5 chronologically-ordered items, with each item looking something like this:
                    {
                        year: 2025,
                        weekday: 'Tuesday',
                        monthAndDay: 'Dec 3',
                        shdPriceDifference: '-9.5',
                        taxDifference: '+0.5',
                        priceDifference: '-10',
                        shdPriceSavedWithPremiumDifference: '+1' (this key only is there if the this.hasPremium is true)
                    }
                */
                laterSchedulingOptionsForProduct = laterSchedulingOptionsForProduct.filter(x=>x!==null);

                const currentCurrency = this.countryCurrencyMap[this.deliveryAreaCountry];
                if(currentCurrency!=="$") {
                    for(let laterOption of laterSchedulingOptionsForProduct) {
                        let shdPriceDifference = laterOption.shdPriceDifference;
                        let firstChar = shdPriceDifference[0]; //either '+' or '-'
                        shdPriceDifference = parseFloat(shdPriceDifference.substring(1));
                        shdPriceDifference*=this.currencyToDollarMap[currentCurrency];
                        if(firstChar==='-') {
                            laterOption.shdPriceDifference = "-"+(-1*shdPriceDifference).toFixed(2);
                        }
                        else {
                            laterOption.shdPriceDifference = "+"+shdPriceDifference.toFixed(2);
                        }

                        let taxDifference = laterOption.taxDifference;
                        firstChar = taxDifference[0]; //either '+' or '-'
                        taxDifference = parseFloat(taxDifference.substring(1));
                        taxDifference*=this.currencyToDollarMap[currentCurrency];
                        if(firstChar==='-') {
                            laterOption.taxDifference = "-"+(-1*taxDifference).toFixed(2);
                        }
                        else {
                            laterOption.taxDifference = "+"+taxDifference.toFixed(2);
                        }

                        if(this.hasPremium) {
                            let shdPriceSavedWithPremiumDifference = laterOption.shdPriceSavedWithPremiumDifference;
                            firstChar = shdPriceSavedWithPremiumDifference[0]; //either '+' or '-'
                            shdPriceSavedWithPremiumDifference = parseFloat(shdPriceSavedWithPremiumDifference.substring(1));
                            shdPriceSavedWithPremiumDifference*=this.currencyToDollarMap[currentCurrency];
                            if(firstChar==='-') {
                                laterOption.shdPriceSavedWithPremiumDifference = "-"+(-1*shdPriceSavedWithPremiumDifference).toFixed(2);
                            }
                            else {
                                laterOption.shdPriceSavedWithPremiumDifference = "+"+shdPriceSavedWithPremiumDifference.toFixed(2);
                            }
                        }

                        let priceDifference = laterOption.priceDifference;
                        firstChar = priceDifference[0]; //either '+' or '-'
                        priceDifference = parseFloat(priceDifference.substring(1));
                        priceDifference*=this.currencyToDollarMap[currentCurrency];
                        if(firstChar==='-') {
                            laterOption.priceDifference = "-"+(-1*priceDifference).toFixed(2);
                        }
                        else {
                            laterOption.priceDifference = "+"+priceDifference.toFixed(2);
                        }
                    }
                }
                
                this.productToOtherSchedulingOptionsMappings[product.id] = laterSchedulingOptionsForProduct;
            },

            updateScheduleAheadDate(product, indexOfNewScheduleAheadDate) {
                const newWeekday = this.productToOtherSchedulingOptionsMappings[product.id][indexOfNewScheduleAheadDate].weekday;
                const newMonthAndDay = this.productToOtherSchedulingOptionsMappings[product.id][indexOfNewScheduleAheadDate].monthAndDay;
                const newPriceDifference = this.productToOtherSchedulingOptionsMappings[product.id][indexOfNewScheduleAheadDate].priceDifference;
                const newYear = this.productToOtherSchedulingOptionsMappings[product.id][indexOfNewScheduleAheadDate].year;
                const newSHDPriceDifference = this.productToOtherSchedulingOptionsMappings[product.id][indexOfNewScheduleAheadDate].shdPriceDifference;
                const newTaxDifference = this.productToOtherSchedulingOptionsMappings[product.id][indexOfNewScheduleAheadDate].taxDifference;
                let newSHDPriceSavedForPremiumDifference;
                if(this.hasPremium) {
                    newSHDPriceSavedForPremiumDifference = this.productToOtherSchedulingOptionsMappings[product.id][indexOfNewScheduleAheadDate].shdPriceSavedWithPremiumDifference;
                }

                this.productSchedules[product.id] = [newWeekday, newMonthAndDay, newPriceDifference, newYear];
                this.$emit("productDeliveryDateHasBeenUpdated",
                    {
                        arrivalTextHeader: this.arrivalTextHeader,
                        itemIdNotProductId: product.id,
                        newWeekday: newWeekday,
                        newMonthAndDay: newMonthAndDay,
                        newPriceDifference: newPriceDifference,
                        newYear: newYear,
                        newSHDPriceDifference: newSHDPriceDifference,
                        newTaxDifference: newTaxDifference,
                        newSHDPriceSavedForPremiumDifference: newSHDPriceSavedForPremiumDifference
                    }
                );
            },

            getDefaultWeekdayMonthDayAndYear() {
                const currentDate = new Date();
    
                currentDate.setHours(currentDate.getHours() + this.getItAsSoonAs);

                const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

                const weekday = weekdays[currentDate.getDay()];
                this.defaultWeekday = weekday;

                const month = months[currentDate.getMonth()];
                const day = currentDate.getDate();
                this.defaultMonthAndDay = `${month} ${day}`;

                this.defaultYear = currentDate.getFullYear();
            },

            productDeliveryScheduleTypeChanged(product) {
                if(this.productScheduleTypes[product.id]==='default') {
                    this.productToDisplayOtherSchedulingOptionsMappings[product.id] = false;
                    this.productSchedules[product.id] = [this.defaultWeekday, this.defaultMonthAndDay, '-0', this.defaultYear];
                    this.$emit("productDeliveryDateHasBeenUpdated",
                        {
                            arrivalTextHeader: this.arrivalTextHeader,
                            itemIdNotProductId: product.id,
                            newWeekday: this.defaultWeekday,
                            newMonthAndDay: this.defaultMonthAndDay,
                            newPriceDifference: '-0',
                            newYear: this.defaultYear,
                            newSHDPriceDifference: '-0',
                            newTaxDifference: '-0',
                            newSHDPriceSavedForPremiumDifference: '-0'
                        }
                    );
                }
            },

            updateCurrencies(currentCurrency, newCurrency) {
                for(let id of Object.keys(this.productSchedules)) {
                    const productSchedule = this.productSchedules[id];
                    let priceDifferenceInProductSchedule = productSchedule[2]; //something like '+20' or '-12' etc
                    const firstChar = priceDifferenceInProductSchedule[0]; //either '+' or '-'
                    
                    priceDifferenceInProductSchedule = parseFloat(priceDifferenceInProductSchedule.substring(1));
                    priceDifferenceInProductSchedule/=this.currencyToDollarMap[currentCurrency];  //convert from currentCurrency to USD
                    priceDifferenceInProductSchedule*=this.currencyToDollarMap[newCurrency]; //convert from USD to newCurrency
                    if(firstChar==='-') {
                        this.productSchedules[id][2] = "-"+(-1*priceDifferenceInProductSchedule).toFixed(2);
                    }
                    else {
                        this.productSchedules[id][2] = "+"+priceDifferenceInProductSchedule.toFixed(2);
                    }

                    if(id in this.productToOtherSchedulingOptionsMappings) {
                        for(let otherSchedulingOption of this.productToOtherSchedulingOptionsMappings[id]) {
                            let priceDifference = otherSchedulingOption.priceDifference;
                            let firstChar = priceDifference[0]; //either '+' or '-'
                            priceDifference = parseFloat(priceDifference.substring(1));
                            priceDifference/=this.currencyToDollarMap[currentCurrency];  //convert from currentCurrency to USD
                            priceDifference*=this.currencyToDollarMap[newCurrency]; //convert from USD to newCurrency
                            if(firstChar==='-') {
                                otherSchedulingOption.priceDifference = "-"+(-1*priceDifference).toFixed(2);
                            }
                            else {
                                otherSchedulingOption.priceDifference = "+"+priceDifference.toFixed(2);
                            }

                            let shdPriceDifference = otherSchedulingOption.shdPriceDifference;
                            firstChar = shdPriceDifference[0]; //either '+' or '-'
                            shdPriceDifference = parseFloat(shdPriceDifference.substring(1));
                            shdPriceDifference/=this.currencyToDollarMap[currentCurrency];  //convert from currentCurrency to USD
                            shdPriceDifference*=this.currencyToDollarMap[newCurrency]; //convert from USD to newCurrency
                            if(firstChar==='-') {
                                otherSchedulingOption.shdPriceDifference = "-"+(-1*shdPriceDifference).toFixed(2);
                            }
                            else {
                                otherSchedulingOption.shdPriceDifference = "+"+shdPriceDifference.toFixed(2);
                            }

                            let taxDifference = otherSchedulingOption.taxDifference;
                            firstChar = taxDifference[0]; //either '+' or '-'
                            taxDifference = parseFloat(taxDifference.substring(1));
                            taxDifference/=this.currencyToDollarMap[currentCurrency];  //convert from currentCurrency to USD
                            taxDifference*=this.currencyToDollarMap[newCurrency]; //convert from USD to newCurrency
                            if(firstChar==='-') {
                                otherSchedulingOption.taxDifference = "-"+(-1*taxDifference).toFixed(2);
                            }
                            else {
                                otherSchedulingOption.taxDifference = "+"+taxDifference.toFixed(2);
                            }

                            if(this.hasPremium) {
                                let shdPriceSavedWithPremiumDifference = otherSchedulingOption.shdPriceSavedWithPremiumDifference;
                                let firstChar = shdPriceSavedWithPremiumDifference[0]; //either '+' or '-'
                                shdPriceSavedWithPremiumDifference = parseFloat(shdPriceSavedWithPremiumDifference.substring(1));
                                shdPriceSavedWithPremiumDifference/=this.currencyToDollarMap[currentCurrency];  //convert from currentCurrency to USD
                                shdPriceSavedWithPremiumDifference*=this.currencyToDollarMap[newCurrency]; //convert from USD to newCurrency
                                if(firstChar==='-') {
                                    otherSchedulingOption.shdPriceSavedWithPremiumDifference = "-"+(-1*shdPriceSavedWithPremiumDifference).toFixed(2);
                                }
                                else {
                                    otherSchedulingOption.shdPriceSavedWithPremiumDifference = "+"+shdPriceSavedWithPremiumDifference.toFixed(2);
                                }
                            }
                        }
                    }
                }
            },

            getTotalPriceDifferenceWithQuantity(priceDifference, quantity) {
                const currentCurrency = this.countryCurrencyMap[this.deliveryAreaCountry];
                let priceDiff = priceDifference; //something like '+10', '-5', etc.
                priceDiff = parseFloat(priceDiff.substring(1));
                priceDiff*=quantity;
                if(priceDifference[0]==='-') {
                    return "-"+currentCurrency+priceDiff.toFixed(2);
                }
                return "+"+currentCurrency+priceDiff.toFixed(2);
            }

        },

        watch: {
            deliveryAreaCountry(newVal, oldVal) {
                let currentCurrency = this.countryCurrencyMap[oldVal];
                let newCurrency = this.countryCurrencyMap[newVal];
                this.updateCurrencies(currentCurrency, newCurrency);
            },

            selectedDestination() {
                for(let product of this.products) {
                    delete this.productToOtherSchedulingOptionsMappings[product.id];
                    if(this.productScheduleTypes[product.id]!=='default') {
                        this.productScheduleTypes[product.id] = 'default';
                        this.productSchedules[product.id] = [this.defaultWeekday, this.defaultMonthAndDay, '-0', this.defaultYear];
                        this.productToDisplayOtherSchedulingOptionsMappings[product.id] = false;
                    }
                }
            }
        }

    };
</script>