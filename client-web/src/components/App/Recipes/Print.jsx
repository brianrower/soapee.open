import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';

import { getRecipe } from 'services/recipesStore';

import RecipePrint from 'components/shared/RecipeComponents/RecipePrint';

import usePrint from 'hooks/usePrint';

export default function Print({ oils }) {
  const { recipeId } = useParams();
  const recipe = getRecipe(recipeId);

  usePrint({ recipe });

  return (
    <div className="recipe-print">
      <Helmet
        title={`${_.get(recipe, 'name')} - Soapee`}
      />

      {recipe && <RecipePrint oils={oils} recipe={recipe} />}
    </div>
  );
}

Print.propTypes = {
  oils: PropTypes.array.isRequired
};
