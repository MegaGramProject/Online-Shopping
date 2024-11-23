<template>

    <div :style="{width: '50em', padding: '1em 1em', backgroundColor: 'white', display: 'flex',
    flexDirection: 'column', gap: '1em'}">
        <h3>{{ arrivalTextHeader }}</h3>

        <div v-for="product in products" :key="product.id" :style="{display: 'flex', gap: '1.5em'}">

            <div :style="{width: '50%', backgroundColor: '#ededed', padding: '1em 2em', display: 'flex',
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

                <p v-if="product.deals.length>0" :style="{fontSize:'0.88em', marginBottom:'0em', marginTop:'2em', lineHeight:'2'}">
                    Deal Selected: <span :style="{padding: '0.5em 0.5em', color: 'white', fontWeight: 'bold', backgroundColor:'#b81220', fontSize: '0.8em', marginRight:'1em'}">{{ formatProductDealText(product.deals[0]) }}</span>
                
                    <template v-if="product.deals[0].prices.length==3">
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
                    <select @input="onChangingQuantity(product.id, product.quantity)" :style="{marginLeft:'1em', padding: '0.3em 0.3em'}">
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

            <form>
                <input type="radio" name="scheduleDelivery" value="default" :style="{marginBottom:'1em'}" checked><b>{{ formatArrivalText() }}</b><br>
                <input type="radio" name="scheduleDelivery" value="scheduleAhead">Schedule <b>ahead</b><br>
            </form>

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
        },

        data() {
            return {
                showerCurtains,
                checkmark,
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
            }
        }

    };
</script>