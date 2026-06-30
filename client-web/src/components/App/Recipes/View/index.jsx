import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Segment, Breadcrumb, Header, Divider } from 'semantic-ui-react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { getRecipe, deleteRecipe, importRecipe } from 'services/recipesStore';
import { exportRecipe } from 'services/recipeFile';

import Section from 'components/shared/Section';
import TimeAgo, { updatedAgo } from 'components/shared/TimeAgo';

import RenderRecipeProperties from '../components/RenderRecipeProperties';

import './style.styl';

export default function View({ oils }) {
  const history = useHistory();
  const { recipeId } = useParams();
  const recipe = getRecipe(recipeId);

  if (!recipe) {
    return (
      <Container className="recipe-view view-page">
        <Segment placeholder textAlign="center">
          <Header icon>Recipe not found.</Header>
          <Button primary as={Link} to="/recipes" content="Back to Recipes" />
        </Segment>
      </Container>
    );
  }

  return (
    <div className="recipe-view view-page">
      <Helmet>
        <title>{recipe.name} - Soapee</title>
      </Helmet>

      <Container>
        <Bread recipe={recipe} />

        <Segment>
          <RecipeHeading recipe={recipe} />
          <Description recipe={recipe} />
          <Notes recipe={recipe} />

          <Divider />

          <RenderRecipeProperties recipe={recipe} oils={oils} isMyRecipe />

          <Divider />

          <Actions recipe={recipe} onCopy={handleCopy} onDelete={handleDelete} />
        </Segment>
      </Container>
    </div>
  );

  //

  function handleCopy() {
    const copy = importRecipe({ ...recipe, name: `${recipe.name} (copy)` });

    history.push(`/recipes/${copy.id}/edit`);
  }

  function handleDelete() {
    deleteRecipe(recipe.id);
    history.push('/recipes');
  }
}

View.propTypes = {
  oils: PropTypes.array.isRequired
};

function Actions({ recipe, onCopy, onDelete }) {
  return (
    <Section className="footer" textAlign="right">
      <Button size="mini" as={Link} to={`/recipes/${recipe.id}/edit`} content="Edit" />
      <Button size="mini" content="Copy" onClick={onCopy} data-cy="recipe-copy" />
      <Button size="mini" as={Link} to={`/recipes/${recipe.id}/print`} content="Print" />
      <Button size="mini" content="Export" onClick={() => exportRecipe(recipe)} />
      <Button size="mini" negative content="Delete" onClick={onDelete} />
    </Section>
  );
}

Actions.propTypes = {
  recipe: PropTypes.object.isRequired,
  onCopy: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

function RecipeHeading({ recipe }) {
  return (
    <Header as="h1">
      <Header.Content>{recipe.name}</Header.Content>
      <Header.Subheader>
        <TimeAgo date={recipe.createdAt} data-cy="recipe-created-at" />
        {recipe.createdAt !== recipe.updatedAt && (
          <TimeAgo date={recipe.updatedAt} data-cy="recipe-updated-at" render={updatedAgo} />
        )}
      </Header.Subheader>
    </Header>
  );
}

RecipeHeading.propTypes = {
  recipe: PropTypes.object.isRequired
};

function Description({ recipe }) {
  if (!recipe.description) {
    return null;
  }

  return <div dangerouslySetInnerHTML={{ __html: recipe.description }} />;
}

Description.propTypes = {
  recipe: PropTypes.object.isRequired
};

function Notes({ recipe }) {
  if (!recipe.notes) {
    return null;
  }

  return (
    <>
      <Header as="h4">Notes</Header>
      <div dangerouslySetInnerHTML={{ __html: recipe.notes }} />
    </>
  );
}

Notes.propTypes = {
  recipe: PropTypes.object.isRequired
};

function Bread({ recipe }) {
  return (
    <Segment>
      <Breadcrumb>
        <Breadcrumb.Section as={Link} to="/">Home</Breadcrumb.Section>
        <Breadcrumb.Divider />
        <Breadcrumb.Section as={Link} to="/recipes">Recipes</Breadcrumb.Section>
        <Breadcrumb.Divider />
        <Breadcrumb.Section active>{_.get(recipe, 'name')}</Breadcrumb.Section>
      </Breadcrumb>
    </Segment>
  );
}

Bread.propTypes = {
  recipe: PropTypes.object.isRequired
};
