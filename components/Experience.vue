<template>
  <section class="experience-area grid-container">
    <div class="grid-container">
      <div class="section-title">
        <h2>My Experience</h2>
        <div class="horizontal-line">
          <div class="top"></div>
          <div class="bottom"></div>
        </div>
      </div>


    <div v-for="item in timeline" class="experience-area__item grid-x">
      <div class="small-12 medium-3 cell">
        <div class="dashed-line" aria-hidden="true"></div>
        <h4>{{item.company}}</h4>
        <p>{{item.from}}-{{item.to}}</p>
      </div>
      <div class="small-12 medium-9 cell">
        <svg aria-hidden="true" fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0h24v24H0z" fill="none"></path>
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
        </svg>
        <h3>{{item.role}}</h3>
        <p>{{item.description}}</p>
      </div>
    </div>


    </div>
  </section>
</template>

<script>

  const timeline = [
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

  export default{
    data: function () {
      return {
        timeline: timeline
      }
    }
  }
</script>
