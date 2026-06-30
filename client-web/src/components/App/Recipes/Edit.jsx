import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Container, Segment, Header, Button } from 'semantic-ui-react';
import { Link, Route, Switch, useHistory, useParams, useRouteMatch } from 'react-router-dom';
import qs from 'qs';

import { getRecipe, updateRecipe, createRecipe } from 'services/recipesStore';

import SoapCalculator from 'components/shared/SoapCalculator';
import RecipePrint from 'components/shared/RecipeComponents/RecipePrint';

import usePrint from 'hooks/usePrint';

export default function Edit({ oils }) {
  const history = useHistory();
  const { recipeId } = useParams();
  const { path, url } = useRouteMatch();

  const recipe = getRecipe(recipeId);

  return (
    <div className="recipe-edit">
      <Helmet
        title="Edit Recipe - Soapee"
      />

      <Switch>
        <Route path={`${path}/print`}>
          <PrintTheRecipe recipe={recipe} oils={oils} />
        </Route>

        <Route>
          {recipe ? (
            <Container className="view-page">
              <SoapCalculator
                canSaveAsCopy
                oils={oils}
                recipe={recipe}
                onSave={updateTheRecipe}
                onSaveAsCopy={createTheRecipe}
                onPrint={handlePrint}
              />
            </Container>
          ) : (
            <Container className="view-page">
              <Segment placeholder textAlign="center">
                <Header icon>Recipe not found.</Header>
                <Button primary as={Link} to="/recipes" content="Back to Recipes" />
              </Segment>
            </Container>
          )}
        </Route>
      </Switch>
    </div>
  );

  //

  function handlePrint(calcRecipe, printOptions) {
    history.push(`${url}/print${qs.stringify(printOptions, { addQueryPrefix: true })}`);
  }

  function updateTheRecipe(updatedRecipe) {
    updateRecipe(recipeId, updatedRecipe);

    return Promise.resolve(history.push(`/recipes/${recipeId}`));
  }

  function createTheRecipe(saveAsRecipe) {
    const saved = createRecipe(saveAsRecipe);

    return Promise.resolve(history.push(`/recipes/${saved.id}`));
  }
}

Edit.propTypes = {
  oils: PropTypes.array.isRequired
};

function PrintTheRecipe({ recipe, oils }) {
  usePrint({ recipe });

  return recipe ? <RecipePrint recipe={recipe} oils={oils} /> : null;
}

PrintTheRecipe.defaultProps = {
  recipe: null
};

PrintTheRecipe.propTypes = {
  recipe: PropTypes.object,
  oils: PropTypes.array.isRequired
};
