<template>
  <section id="experience" class="experience-area grid-container">
    <div class="grid-container">
      <div class="section-title">
        <h2 tabindex="0">Work Experience</h2>
        <div class="horizontal-line" aria-hidden="true">
          <div class="top"></div>
          <div class="bottom"></div>
        </div>
      </div>

      <div v-for="item in timeline" class="experience-area__item grid-x">
        <div class="small-12 medium-3 cell">
          <div class="experience-line" aria-hidden="true"></div>
          <h4 tabindex="0">{{item.company}}</h4>
          <p tabindex="0">{{item.from}}-{{item.to}}</p>
        </div>
        <div class="small-12 medium-9 cell">
          <div class="experience-dot"></div>
          <!--<svg aria-hidden="true" fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">-->
            <!--<path d="M0 0h24v24H0z" fill="none"></path>-->
            <!--<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>-->
          <!--</svg>-->
          <h3 tabindex="0">{{item.role}}</h3>
          <p tabindex="0">{{item.description}}</p>
        </div>
      </div>

    </div>
  </section>
</template>

<script>

  const timeline = [
    {
      from: '2013',
      to: 'Present',
      company: 'Avanade Italy',
      role: 'Experience Technology',
      description: 'As Front-end Architect I turn designed experiences into reality. I provide efficient and scalable solutions to deliver a seamless experience across multiple touchpoints. My goal is to help designers shape and imagine the future, as well to help developers to implement innovative solutions. Along with Avanade Front-end SMEs from other countries, I\'m leading a global community at Avanade about Front-end Development.'
    },
    {
      from: '2000',
      to: '2002',
      company: 'Behance',
      role: 'Consultant',
      description: 'There are many variations of passages of Lorem Ipsum available, but the majority There are many variations of passages of Lorem Ipsum available, but the majorityThere are many variations of passages of Lorem Ipsum available, but the majorityThere are many variations of passages of Lorem Ipsum available, but the majorityThere are many variations of passages of Lorem Ipsum available, but the majorityThere are many variations of passages of Lorem Ipsum available, but the majorityThere are many variations of passages of Lorem Ipsum available, but the majority'
    },
    {
      from: '2000',
      to: '2002',
      company: 'Behance',
      role: 'Consultant',
      description: 'There are many variations of passages of Lorem Ipsum available, but the majority'
    },
    {
      from: '2000',
      to: '2002',
      company: 'Behance',
      role: 'Consultant',
      description: 'There are many variations of passages of Lorem Ipsum available, but the majority'
    },
    {
      from: '2000',
      to: '2002',
      company: 'Behance',
      role: 'Consultant',
      description: 'There are many variations of passages of Lorem Ipsum available, but the majority'
    },
    {
      from: '2000',
      to: '2002',
      company: 'Behance',
      role: 'Consultant',
      description: 'There are many variations of passages of Lorem Ipsum available, but the majority'
    }
  ]

  export default {
    data: function () {
      return {
        timeline: timeline
      }
    }
  }
</script>
