import _ from 'lodash';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Container } from 'semantic-ui-react';
import { Route, Switch, useRouteMatch, useHistory } from 'react-router-dom';
import qs from 'qs';

import useOils from 'hooks/useOils';
import usePrint from 'hooks/usePrint';

import { createRecipe } from 'services/recipesStore';

import Section from 'components/shared/Section';
import SoapCalculator from 'components/shared/SoapCalculator';
import RecipePrint from 'components/shared/RecipeComponents/RecipePrint';

export default function Calculator() {
  const { url, path } = useRouteMatch();
  const history = useHistory();
  const [oils, loading] = useOils();
  const [recipe, setRecipe] = useState();

  return (
    <div className="calculator">
      <Helmet
        title="Lye Calculator - Soapee"
      />

      <Switch>
        <Route path={`${path}/print`} component={PrintTheRecipe} />

        <Route>
          <Section loading={loading}>
            {!(_.isEmpty(oils)) && (
              <Container className="view-page">
                <SoapCalculator
                  recipe={recipe}
                  oils={oils}
                  onSave={saveRecipe}
                  onPrint={handlePrint}
                />
              </Container>
            )}
          </Section>
        </Route>
      </Switch>
    </div>
  );

  //

  function handlePrint(calcRecipe, printOptions) {
    setRecipe(calcRecipe);
    history.push(`${url}/print${qs.stringify(printOptions, { addQueryPrefix: true })}`);
  }

  function saveRecipe(calcRecipe) {
    const saved = createRecipe(calcRecipe);

    return Promise.resolve(history.push(`/recipes/${saved.id}`));
  }

  //

  function PrintTheRecipe() {
    usePrint({ recipe });

    if (recipe) {
      return <RecipePrint recipe={recipe} oils={oils} />;
    } else {
      history.push('/calculator');
      return null;
    }
  }
}
