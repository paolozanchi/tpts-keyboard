<template>
  <div class="gdprConsentModal">
    <h3>We use cookies</h3>

    <div class="row">
      <div class="col-1">
        <span>
          We use cookies and other tracking technologies to analyze our website traffic and to understand where our visitors are coming from.
        </span>
      </div>

      <div class="col-2">
        <RippleButton 
          variant="success"
          @click="$emit('grant-consent')"
        >
          Ok!
        </RippleButton>

        <RippleButton
          variant="danger"
          @click="$emit('deny-consent')"
        >
          Opt out
        </RippleButton>
      </div>
    </div>
  </div>
</template>

<script>
import RippleButton from '@/components/RippleButton.vue'

export default {
  name: 'GdprConsentModal',
  components: {
    RippleButton
  }
};
</script>

<style scoped>
    @media only screen and (min-width: 960px) {
      /* styles for browsers larger than 960px; */
      .gdprConsentModal {
        width: 75%;
        margin: 0;
      }
    }
    @media only screen and (min-width: 1440px) {
      /* styles for browsers larger than 1440px; */
      .gdprConsentModal {
        width: 50%;
        margin: 0;
      }
    }
    @media only screen and (min-width: 2000px) {
      /* for sumo sized (mac) screens */
      .gdprConsentModal {
        width: 50%;
      }
    }
    @media only screen and (max-device-width: 480px) {
      .gdprConsentModal {
        width: 100%;
      }
    }
    @media only screen and (device-width: 768px) {
      /* default iPad screens */
      .gdprConsentModal {
        width: 100%;
      }
    }
    /* different techniques for iPad screening */
    @media only screen and (min-device-width: 481px) and (max-device-width: 1024px) and (orientation:portrait) {
      /* For portrait layouts only */
      .gdprConsentModal {
        width: 100%;
      }
    }

    @media only screen and (min-device-width: 481px) and (max-device-width: 1024px) and (orientation:landscape) {
      /* For landscape layouts only */
      .gdprConsentModal {
        width: 100%;
      }
    }

  .gdprConsentModal {
    position: absolute;
    padding: .5rem;
    left: 50%;
    bottom: 0;
    -moz-transform: translateX(-50%);
    transform: translateX(-50%);
    background-color: var(--lightenDark);
    font-size: 10pt;
  }

  .row {
    display: flex;
    flex-wrap: wrap;
  }

  .col-1 {
    flex: 0 0 75%;
    max-width: 75%;
  }

  .col-2 {
    flex: 0 0 25%;
    max-width: 25%;
  }
</style>
