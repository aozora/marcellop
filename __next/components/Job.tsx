/* eslint-disable react/no-danger */
import PropTypes from 'prop-types';

const Job = ({ job }) => {
  const getYear = date => {
    const d = new Date(date);
    return d.getFullYear();
  };

  return (
    <article>
      <header>
        <h3>{`${job.title} @ ${job.company}`}</h3>
      </header>
      <p className="job__date">
        <span>{`${getYear(job.from)} - `}</span>
        {job.to && <span>{getYear(job.to)}</span>}
        {!job.to && <span>present</span>}
      </p>
      {/* eslint-disable-next-line react/no-danger */}
      <div className="job__description" dangerouslySetInnerHTML={{ __html: job.description }} />
    </article>
  );
};

export default Job;
