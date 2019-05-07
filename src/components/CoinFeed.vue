<template>
  <div class="coin_slot-cntr col center">
    <div class="insert_coin">
      INSERT COIN TO ADD CREDIT
    </div>
    <div class="coins-cntr col center pull-top">
      <div class="coins_inserted">
        0
      </div>
      <div class="coins_inserted-label">
        credits added
      </div>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>


<style lang="scss" scoped>
  .coin_slot-cntr {
    width: 13rem;
    height: 12rem;
    background-color: rgba($blue, .045);
    border-radius: 14px;
    position: relative;
    &::after {
      content: '';
      display: block;
      width: 12rem;
      height: 11rem;
      border: 2px dashed rgba($blue, .45);
      border-radius: 12px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  .insert_coin {
    color: darken($blue, 20%);
    font-weight: 800;
    font-size: 10px;
    text-align: center;
    max-width: 6rem;
    margin-top: 1.5rem;
  }

  .coins_inserted-label {
    font-family: 'Operator Mono';
    font-size: 12px;
    color: rgba(black, .65);
  }

  .coins_inserted {
    font-size: 56px;
    line-height: 1em;
    font-weight: 300;
    color: rgba(black, .75);
    margin-bottom: -4px;
  }

  .coins-cntr {
    padding-top: 1.5rem;
    height: 100%;
  }
</style>
