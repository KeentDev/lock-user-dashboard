<template>
  <div class="transaction_payment-modal-cntr" ref='paymentModal'>
    <div class="transaction_payment-modal col pull-apart">
      <div class="modal-content col">
        <div class="modal-head">
          <span>{{title}} </span>
          <span>Payment</span>
        </div>
        <div class="modal-body col">
          <CoinFeed 
            class="coin_feed-cntr stick-middle"
          />
          <div class="dashboard-cntr row pull-apart --series">
            <DashboardTile 
              :is-secondary='false' 
              title='CREDIT BALANCE'
              :value='userBalance'
              prefix='PHP'
              />
            <DashboardTile 
              title='REMAINING FEE'
              :value='paymentDetails.remainingInvoiceFee'
              prefix='PHP'
            />
            <DashboardTile 
              title='TOTAL INVOICE'
              :value='paymentDetails.remainingInvoiceFee'
              prefix='PHP'
            /> 
          </div>
          <div class="payment_input-cntr row center">
            <div class="payment_input row center">
              <input id='payment' type="number" name="cointInput" v-model="paymentInput" autofocus=true ref="amountInput" required/>
              <span class="row center slash">/</span>
              <span>{{paymentDetails.remainingInvoiceFee}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-cta">
        <div 
          class="solid-btn row center" 
          @click="invoicePayment(); ">
          <div class="lock_icon-b_w row center">
            <svg width="44" height="33" viewBox="0 0 44 33" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="30.99" cy="16.2123" r="12.2685" fill="white"/>
              <circle cx="30.99" cy="16.2123" r="10.2573" fill="#333333"/>
              <circle cx="30.99" cy="16.2122" r="8.24606" fill="white" fill-opacity="0.5"/>
              <circle cx="31.1064" cy="16.3287" r="5.14453" fill="#333333"/>
              <circle cx="16.598" cy="16.4482" r="14.9482" fill="white" stroke="#333333" stroke-width="3"/>
              <circle cx="16.5981" cy="16.4482" r="3.06713" transform="rotate(-90 16.5981 16.4482)" fill="#333333"/>
              <path d="M16.3621 16.4482L6.80682 19.1044V13.792L16.3621 16.4482Z" fill="#333333"/>
              <path d="M16.3621 16.4482L25.9174 19.1044V13.792L16.3621 16.4482Z" fill="#333333"/>
            </svg>
          </div>
          <div class="btn-label"> 
            CONFIRM PAYMENT
          </div>
        </div>
        <div class="ghost-button--secondary row center" v-on:click='$emit("cancel-payment")'>
          CANCEL
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DashboardTile from '@/components/DashboardTile.vue'
import axios from '@/http-common'
import CoinFeed from '@/components/CoinFeed.vue'
import Btn from '@/_helpers/KeyMapper'

export default {
  data() {
    return {
      paymentInput: '',
      paymentDetails: {
        remainingInvoiceFee: '',
        invoiceId: '',
        totalInvoiceFee: '',
      },
      transactionInfo: {
        auth_activity_id: '',
        invoiceFee: '',
        invoiceId: '',
        invoiceFeePayment: ''
      }
    }
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    userBalance: {
      type: null,
      default: ''
    },
    showPaymentModal: {
      type: Boolean,
      default: false
    },
    unitNum: {
      type: null,
      default: ''
    },
    transactionType: {
      type: String,
      default: 'rent'
    },
    hours: {
      type: null,
      default: 0
    },
    confirmPayment: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    checkKey(ev) {
      if(isNaN(parseInt(ev.key))){
        if(ev.keyCode == Btn.proceed){
          this.invoicePayment();
          self.$emit("cancel-payment");
        }
      }
    },
    invoicePayment() {
      axios.post('/locker/transaction/authenticate', {
        invoice_id: this.paymentDetails.invoiceId,
        transaction_amount: this.paymentInput
      })
      .then(async res => {
        let responseData = res.data;
        let invoicePaymentData = responseData.data;
        let isNextSession = false;

        if(this.transactionType == 'overdue'){
          isNextSession = true;
        }
        await axios.post('/locker/transaction/session', {
          auth_activity_log_id: this.transactionInfo.auth_activity_id,
          next_session: isNextSession
        })
        .then(res => {
          let responseData = res.data;
          let sessionAuth = responseData.data;
          if(responseData.success){
            window.removeEventListener('keyup', this.checkKey);
            this.$emit('refresh-data'); 
            this.$emit('cancel-payment');
            if(this.transactionType == 'overdue'){
              this.$emit('show-option', true);
            }else if(this.transactionType == 'rent'){
              this.$emit('remove-reservation', true);
            }
            this.$router.push('unit');
          }else{
            console.error('Something went wrong renting you a unit. Please check developer for more information.');
          }
        })
      })
    },
    
  },
  watch: {
    showPaymentModal(newVal, oldVal) {
      if(newVal == true){
        
      }else {
        let paymentModalRef = this.$refs.paymentModal;
        let self = this;

        window.removeEventListener('keyup', self.checkKey);
      }
    },
    confirmPayment(newVal, oldVal) {
      console.log(newVal, oldVal);
      if(newVal){
        this.invoicePayment();
      }
    }
  },
  components: {
    DashboardTile,
    CoinFeed
  },
  mounted() {
    let paymentModalRef = this.$refs.paymentModal;

    let self = this;

    paymentModalRef.addEventListener('keyup', self.checkKey);

    this.$refs.amountInput.focus();
    
    self.paymentInput = 0;
  
    axios.post('/locker/transaction/authorization', {
      unit_num: this.unitNum,
      transaction_type: this.transactionType,
    })
    .then(res => {
      let responseData = res.data;

      return Promise.resolve(this.transactionInfo.auth_activity_id = responseData.data.auth_activity_id)
    })
    .then(activityId => {
      axios.post('/locker/transaction/invoice', {
        auth_activity_id: activityId,
        hours: this.hours
      })
      .then(res => {
        let responseData = res.data;
        let invoiceData = responseData.data;
        
        this.paymentDetails.remainingInvoiceFee = invoiceData.fee;
        this.paymentDetails.invoiceId = invoiceData.invoice_id;
      })
    })
  }
}
</script>


<style lang="scss" scoped>
.transaction_payment-modal-cntr {
  background-color: rgba(0,0,0,.25);
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;
}

.transaction_payment-modal {
  background-color: #F4F4F4;
  border-radius: 7px;
  padding: 1.25rem;
  padding-bottom: 0;
  width: 28rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 6px 28px 64px -18px rgba(0,0,0,.65);
  .ghost-button--secondary {
    font-size: 12px;
    font-weight: 600;
    color: #999;
    margin: 1.25rem 0;
  }
  .lock_icon-b_w {
    margin-right: .5rem;
    svg {
      height: 24px;
    }
  }
}

.modal-head {
  font-size: 24px;
  color: #333;
  margin: .5rem 0;
  span {
    &:first-child {
      font-weight: 600;
    }
    &:last-child {
      color: $blue;
    }
  }
}

.modal-content {
  height: 100%;
}

.modal-cta {
  .solid-btn {
    padding: .75rem 0;
    text-align: center;
    background-color: #333;
    color: white;
  }
}

.modal-body {
  margin: 2rem 0;
  height: 100%;
  .dashboard-cntr {
    @include series-row(12px);
  }
}

.payment_input-cntr {
  width: 100%;
  height: 100%;
  margin-top: 2rem;
}

.payment_input {
  font-size: 38px;
  font-family: 'Operator Mono', serif;
  input {
    font-size: 40px;
    max-width: 5rem;
    font-family: 'Operator Mono';
    background-color: rgba($blue, .1);
    border: none;
    color: darken($blue, 25%);
    border-radius: 5px;
    padding: 2px 8px;
    margin: 0 6px;
  }
  .slash {
    font-size: 28px;
    font-weight: 300;
    margin: 0 6px;
    opacity: .25;
  }
  span {
    line-height: 1em;
    &:last-child {
      opacity: .35;
      font-weight: 400;
    }
  }
}

.coin_feed-cntr {
  margin-bottom: 2rem;
}
</style>
