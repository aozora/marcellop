export const resumeQuery = `
  query Resume {
    allResumeJobs(orderBy: from_DESC) {
      id
      title
      from
      to
      company
      description
    }     
  }
`;
