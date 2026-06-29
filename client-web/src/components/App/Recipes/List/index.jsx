import _ from 'lodash';
import React, { useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Button, Container, Breadcrumb, Segment, Table, Message, Header } from 'semantic-ui-react';
import { Link, useHistory } from 'react-router-dom';

import { listRecipes, deleteRecipe } from 'services/recipesStore';
import { exportRecipe, importRecipeFile } from 'services/recipeFile';

import TimeAgo from 'components/shared/TimeAgo';

export default function List() {
  const history = useHistory();
  const fileInputRef = useRef(null);
  const [recipes, setRecipes] = useState(listRecipes);
  const [error, setError] = useState(null);

  return (
    <Container className="view-page">
      <Helmet
        title="My Recipes - Soapee"
      />

      <Bread />

      <Segment clearing>
        <Button primary as={Link} to="/calculator" content="New Recipe" icon="calculator" />
        <Button content="Import from JSON" icon="upload" onClick={handleImportClick} />
        <input
          hidden
          ref={fileInputRef}
          type="file"
          accept="application/json,.json"
          onChange={handleFileSelected}
        />
      </Segment>

      {error && <Message negative onDismiss={() => setError(null)} content={error} />}

      {_.isEmpty(recipes) && (
        <Segment placeholder textAlign="center">
          <Header icon>No saved recipes yet.</Header>
          <Button primary as={Link} to="/calculator" content="Create your first recipe" />
        </Segment>
      )}

      {!(_.isEmpty(recipes)) && (
        <Table unstackable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Recipe</Table.HeaderCell>
              <Table.HeaderCell collapsing>Updated</Table.HeaderCell>
              <Table.HeaderCell collapsing textAlign="right">Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {_.map(recipes, recipe => (
              <Table.Row key={recipe.id}>
                <Table.Cell>
                  <Link to={`/recipes/${recipe.id}`}>{recipe.name}</Link>
                </Table.Cell>
                <Table.Cell collapsing>
                  <TimeAgo date={recipe.updatedAt} />
                </Table.Cell>
                <Table.Cell collapsing textAlign="right">
                  <Button size="mini" as={Link} to={`/recipes/${recipe.id}/edit`} content="Edit" />
                  <Button size="mini" content="Export" onClick={() => exportRecipe(recipe)} />
                  <Button size="mini" negative content="Delete" onClick={() => handleDelete(recipe.id)} />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}
    </Container>
  );

  //

  function handleImportClick() {
    setError(null);
    fileInputRef.current.click();
  }

  function handleFileSelected(event) {
    const file = event.target.files[0];

    event.target.value = '';

    if (!file) {
      return;
    }

    importRecipeFile(file)
      .then(imported => history.push(`/recipes/${imported.id}`))
      .catch(err => setError(err.message || 'Could not import recipe.'));
  }

  function handleDelete(id) {
    deleteRecipe(id);
    setRecipes(listRecipes());
  }
}

function Bread() {
  return (
    <Segment>
      <Breadcrumb>
        <Breadcrumb.Section as={Link} to="/">Home</Breadcrumb.Section>
        <Breadcrumb.Divider />
        <Breadcrumb.Section active>My Recipes</Breadcrumb.Section>
      </Breadcrumb>
    </Segment>
  );
}
