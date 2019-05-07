<template>
  <div class="home col center">
    <Card 
      class=""
      :tag='this.cardTag'
      :head='this.cardHead'
      :meta-info='this.cardMeta'
      :showMetaInfo='hasRental'
      :show-cta='!hasRental'
      :is-overdue='this.isOverdue'
    />
    <div class="dashboard_card-cntr row">
      <DashboardCard />
      <div class="dashboard-wrap">
        <DashboardCard 
          title='Recent Rental'
          sub_title='2 Weeks Ago'
          area='Beside D.O.'
          locker_num='#7'
          class="card-stack"
        />
        <DashboardCard class="card-stack" />
        <DashboardCard class="card-stack" />
      </div>
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card.vue'
import DashboardCard from '@/components/DashboardCard.vue'
import axios from '@/http-common';
import helper from '@/_helpers/textManipulation';
import { constants } from 'crypto';

export default {
  data () {
    return {
      hasRental: false,
      cardTag: '',
      cardHead: '',
      cardMeta: '',
      isOverdue: false
    }
  },
  components: {
    Card,
    DashboardCard
  },
  mounted () {
    axios.get('user/profile')
      .then(res => {
        let response = res.data;
        let rental = response.rental;
        let hasRental = false;
        let timeLeft = helper.epochToHumanTime(helper.getTimeLeft(rental.end));

        this.cardMeta = timeLeft.sentence;
        this.isOverdue = timeLeft.isOverdue;

        if(response.success) {
          hasRental = rental.hasRental;
          this.hasRental = hasRental;
          if(hasRental){
            this.cardTag = rental.unit_area_location;
            this.cardHead = `#${rental.unit_num}`;
          }else {
            let fullName = `${response.data.first_name} ${response.data.last_name}`;
            this.cardTag = fullName;
          }
        }else {
          console.error('Something went wrong.');
        }
      })
      .catch(err => console.error(err));
  }
}
</script>

<style lang="scss" scoped>

.home {
  height: 100%;
}

.dashboard_card-cntr {
  margin-top: 3rem;
  position: relative;
}

.dashboard-wrap {
  position: absolute;
}

.card-stack {
  position: absolute;
  &:nth-child(1) {
    background-color: white;
    z-index: 9;
  }
  &:nth-child(2) {
    z-index: 8;
    top: -5px;
    width: 21rem;
    left: .5rem;
    background-color: #FAFAFA;
  }
  &:nth-child(3) {
    z-index: 7;
    top: -8px;
    width: 19.5rem;
    left: 1.25rem;
    background-color: #F6F6F6;
  }
}

</style>

