import React from 'react';
import PropTypes from 'prop-types';
import { HelmetDatoCms } from 'gatsby-source-datocms';

const Seo = ({ meta }) => <HelmetDatoCms seo={meta} />;

Seo.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  meta: PropTypes.object.isRequired
};

export default Seo;
