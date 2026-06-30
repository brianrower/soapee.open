import React from 'react';
import { Grid, Segment } from 'semantic-ui-react';

import './footer.styl';

export default function Footer() {
  return (
    <Segment inverted className="footer app-footer">
      <Grid container stackable columns={1}>
        <Grid.Row>
          <Grid.Column>
            Soapee is a Saponification calculator and soap recipe tool
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
}
