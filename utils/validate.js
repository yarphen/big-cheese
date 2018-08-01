const validateDirections = (directions) => {
  const { direction, oppositeDirection } = directions;
  if (direction === -1 || oppositeDirection === -1) {
    throw new Error('Invalid direction. Probably you do not have acccess to this deal.');
  }
  return directions;
};


const validateQuery = (updateQuery) => {
  const { price } = updateQuery;
  if (price < 0) {
    throw new Error('Could not set negative price');
  }
  return updateQuery;
};

module.exports = {
  validateDirections,
  validateQuery,
};
