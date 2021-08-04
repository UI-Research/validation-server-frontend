import { Grid, IconButton, Typography } from '@material-ui/core';
import { AddShoppingCart, MoreVert } from '@material-ui/icons';
import Accordion from '../Accordion';
import CodeBlock from '../CodeBlock';
import Paragraph from '../Paragraph';
import SpreadsheetTableExample from './SpreadsheetTableExample';
import TableExample from './TableExample';

function StyleGuide(): JSX.Element {
  return (
    <div>
      <Typography variant="h1">Heading 1 (h1) example</Typography>
      <Typography variant="h2">Heading 2 (h2) example</Typography>
      <Typography variant="h3">Heading 3 (h3) example</Typography>
      <Typography variant="h4">Heading 4 (h4) example</Typography>
      <Typography variant="h5">Heading 5 (h5) example</Typography>
      <Typography variant="h6">Heading 6 (h6) example</Typography>
      <Paragraph>
        Curabitur dignissim aliquid voluptates, quas, exercitation fuga iusto.
        Molestiae aptent atque quidem, cumque ut quibusdam, dictum dicta! Sint
        natus dolorum pharetra, natoque in nesciunt libero distinctio a unde
        convallis ex senectus veritatis, irure tincidunt. Dolorem, class?
        Adipiscing elit ultricies quam netus minus, nihil venenatis, magna.
      </Paragraph>
      <Paragraph>
        <a href="#">Aperiam eaque</a> cubilia eligendi iure sociosqu taciti
        condimentum nascetur aenean morbi, <strong>impedit habitant</strong>,
        quas, <u>numquam</u>, nisi potenti excepturi, <em>veniam eveniet</em>.
        Quas nemo vero aliquet voluptatibus praesent asperiores vitae aute
        taciti? Ipsum sociosqu et, tincidunt sagittis, fermentum parturient
        quae, a wisi? Odit sint corporis nobis eiusmod risus tincidunt fringilla
        exercitation felis aute, harum, laborum felis! Sed penatibus. Corrupti,
        tortor, nibh hic.
      </Paragraph>
      <Paragraph>
        <strong>Bold text example.</strong>
      </Paragraph>
      <Paragraph>
        <em>Italics text example.</em>
      </Paragraph>
      <Paragraph>
        <u>Underline text example.</u>
      </Paragraph>
      <ul>
        <li>Unordered list item 1</li>
        <li>
          Unordered list item 2
          <ul>
            <li>Sub-item 1</li>
            <li>Sub-item 2</li>
            <li>Sub-item 3</li>
          </ul>
        </li>
        <li>Unordered list item 3</li>
        <li>Unordered list item 4</li>
      </ul>
      <ol>
        <li>Ordered list item 1</li>
        <li>
          Ordered list item 2
          <ol>
            <li>Sub-item 1</li>
            <li>Sub-item 2</li>
            <li>Sub-item 3</li>
          </ol>
        </li>
        <li>Ordered list item 3</li>
        <li>Ordered list item 4</li>
      </ol>
      <Typography variant="h5">Table Example</Typography>
      <TableExample />
      <Typography variant="h5">Table Example with Radio inputs</Typography>
      <TableExample useRadio={true} />
      <Typography variant="h5">Spreadsheet Table Example</Typography>
      <SpreadsheetTableExample />
      <div>
        <Typography variant="h5">Code Block example</Typography>
        <CodeBlock
          code={`tabulation_private(
  transformations = c(
    mutate(
      income_category = case_when(
        c00100 < 10000 ~ 0,
      )
    )
  )
)`}
          maxHeight={145}
        />
      </div>
      <div>
        <Typography variant="h5">Simple Accordion example</Typography>
        <Accordion
          id="simple-accordion-example"
          summaryContent="Accordion Summary Content"
        >
          <Paragraph>
            Cubilia error assumenda deleniti vel soluta! Ipsum possimus libero
            vestibulum sodales occaecati iaculis ligula? Quis urna! Porta
            interdum. Pellentesque repudiandae scelerisque quae nec praesent
            quo. Velit veritatis, placerat, porro cras! Cubilia fringilla
            explicabo perspiciatis! Aliquam? Arcu, mollitia nostrud consequatur
            taciti ridiculus vestibulum, nisi faucibus, ipsam mauris autem
            voluptas! Lobortis irure, ipsam convallis conubia viverra laborum,
            condimentum, class numquam consectetuer molestie.
          </Paragraph>
          <Paragraph>
            Omnis similique laborum fermentum possimus, quos taciti massa
            pretium pharetra? Adipisci natoque. Asperiores sociis porro
            facilisis molestias eiusmod montes aut congue eligendi, amet
            lobortis, cursus eligendi, explicabo dolor, ea dis, hendrerit aut
            tenetur hac quae amet per aliqua anim libero exercitation laborum
            tristique aspernatur sollicitudin aut rhoncus doloribus nisl?
            Consequuntur corrupti nisl torquent nostrum sint elit fermentum
            posuere omnis cupiditate.
          </Paragraph>
        </Accordion>
        <Typography variant="h5">Complex Accordion example</Typography>
        <Accordion
          id="complex-accordion-example"
          summaryContent={
            <Grid container={true} alignItems="center">
              <Grid item={true} xs={7} md={9}>
                Tabulation of EITC Filers
              </Grid>
              <Grid item={true} xs={1} md={1}>
                3
              </Grid>
              <Grid item={true} xs={4} md={2}>
                <Grid container={true} justify="flex-end">
                  <Grid item={true}>
                    <IconButton aria-label="Add">
                      <AddShoppingCart />
                    </IconButton>
                    <IconButton aria-label="More">
                      <MoreVert />
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          }
        >
          <div style={{ width: '100%' }}>
            <div>
              <strong>Command:</strong>
            </div>
            <CodeBlock
              code={`tabulation_private(
  transformations = c(
    mutate(
      income_category = case_when(
        c00100 < 10000 ~ 0,
      )
    )
  )
)`}
              maxHeight={145}
            />
            <div>
              <strong>Results with Synthetic Data</strong>
            </div>
            <SpreadsheetTableExample />
          </div>
        </Accordion>
      </div>
    </div>
  );
}

export default StyleGuide;
