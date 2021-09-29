import { Typography } from '@material-ui/core';
import CodeBlock from '../components/CodeBlock';
import { H1, H2, H3 } from '../components/Headings';
import PageTemplate from '../components/PageTemplate';
import Paragraph from '../components/Paragraph';
import SectionTitle from '../components/SectionTitle';

const title = 'Help';

function HelpPage(): JSX.Element {
  return (
    <PageTemplate title={title}>
      <SectionTitle>{title}</SectionTitle>
      <div>
        <H1>
          <a id="Validation_Server_Prototype__Version_01_Commands_Guide_0"></a>
          Validation Server Prototype - Version 0.1 Commands Guide
        </H1>
        <Paragraph>
          This document is an explainer to the commands available in the initial
          release, what we are calling version 0.1, of the validation server
          prototype. We provide plenty of examples so that folks can easily copy
          and paste and use this guide to construct initial example queries.
        </Paragraph>

        <H2>
          <a id="Language_and_Commands_allowed_4"></a>Language and Commands
          allowed
        </H2>
        <Paragraph>
          We’ll get to the examples shortly. Commands at this stage, are
          submitted in <strong>SQL</strong>. I know, you probably program in R,
          Stata, Python, or SAS. But we haven’t yet had enough time to produce
          libraries that will support those languages. We will, but in the
          meantime, current libraries easily support SQL and it’s fairly simple
          to learn and adapt examples, so we have started there.
        </Paragraph>
        <Paragraph>
          It’s also important to note there are{' '}
          <strong>2 types of commands</strong> you can submit:
        </Paragraph>
        <ol>
          <Typography component="li">
            <strong>Transformation commands [optional]:</strong> Commands that
            transform the data before requesting the summary statistics, such as
            creating a variable, taking the log of a variable, adding two
            variables together, etc. It’s important to note that{' '}
            <em>
              you will not be able to view the data in it’s transformed state
            </em>
            , only call Summary commands using such data, in order to protect
            privacy. As a result, however, you are only limited in this command
            to the SQL commands that the Postgres database system supports,
            allowing for some flexibility. You may opt not to submit a
            Transformation command if you simply wish to perform a Summary
            command on the data. The original dataset is named{' '}
            <code>puf.puf</code> and you can execute queries against that data
            directly without transformation commands.{' '}
            <strong>
              Transformation commands should use <code>CREATE TABLE</code>{' '}
              syntax to create a temporary table that we will use as the basis
              for the Summary commands
            </strong>
            . Transformation commands are also where data subsetting occurs.{' '}
            <strong>
              Note that the recid column must be included in all transformation
              queries.
            </strong>
          </Typography>
          <Typography component="li">
            <strong>Summary command:</strong> Commands that take the Transformed
            data (or the original data, if no Transformation command is
            specified) and summarize it somehow. In this prototype, examples of
            summarization include counts, sums, averages, variance, and standard
            deviations, but also include group by statements. Summary commands
            invoke the differentially private libraries used in the backend
            infrastructure and return data to you as a sumamrized table (or
            single number, if that’s what was requested). As a result, the
            operations you can perform are limited.{' '}
            <strong>
              Summary commands should not have a <code>WHERE</code> clause, only
              Transformation commands.
            </strong>{' '}
            We recommend always using an order by statement to make the
            comparison of the tables generated from the synthetic data and the
            confidential data easier.
          </Typography>
        </ol>
        <Paragraph>
          <strong>
            All commands should have a <code>SELECT</code> statement.
          </strong>{' '}
          (just to simplify things on our end and constrain the range of
          potential errors).
        </Paragraph>

        <H2>
          <a id="Note_on_the_PUF__We_Modified_it_to_have_Equal_Weights_15"></a>
          Note on the PUF - We Modified it to have Equal Weights
        </H2>
        <Paragraph>
          In this example, we use a modified version of the PUF to have equal
          weights, given that current differentially private algorithms in
          production do not adequately account for weights.
        </Paragraph>

        <H2>
          <a id="Transformation_Command_Examples_19"></a>Transformation Command
          Examples
        </H2>
        <Paragraph>
          Because Transformation commands do not invoke the differentially
          private system and rely instead only on the Postgres SQL engine, you
          are constrained only by the functions available to Postgres SQL. You
          can find a list of available mathematical operators{' '}
          <a href="https://www.postgresql.org/docs/current/functions-math.html">
            here
          </a>
          , but of course other SQL operators may be relevant, and the full
          Postgres SQL Select documentation can be found{' '}
          <a href="https://www.postgresql.org/docs/current/sql-select.html">
            here
          </a>
          .
        </Paragraph>

        <H3>
          <a id="Creating_a_Categorical_Variable_from_a_Continuous_Variable_Subsetting_data_23"></a>
          Creating a Categorical Variable from a Continuous Variable, Subsetting
          data
        </H3>
        <Paragraph>
          In this example, we create a new variable,{' '}
          <code>income_category</code>, from the income variable,{' '}
          <code>e00100</code> into a new table that we will use for our Summary
          Commands, and make sure we select the other variables we plan to
          analyze in the Summary Command as well (<code>s006</code>,{' '}
          <code>mars</code>, and <code>eic</code>). We also include{' '}
          <code>recid</code> as it is required for the system to execute queries
          successfully. We use a <code>WHERE</code> clause to subset the data
          based on certain conditions.
        </Paragraph>
        <CodeBlock
          code={`CREATE TABLE puf.puf_gmacdonald AS
SELECT e00200, mars, eic, e00100, e59720, recid, s006,
  CASE WHEN (e00100 < 10000) THEN 0
        WHEN (e00100 < 11000) THEN 10
        WHEN (e00100 < 12000) THEN 11
        WHEN (e00100 < 13000) THEN 12
        WHEN (e00100 < 14000) THEN 13
        WHEN (e00100 < 15000) THEN 14
        WHEN (e00100 < 16000) THEN 15
        WHEN (e00100 < 17000) THEN 16
        WHEN (e00100 < 18000) THEN 17
        WHEN (e00100 < 19000) THEN 18
        WHEN (e00100 < 20000) THEN 19
        WHEN (e00100 < 21000) THEN 20
        WHEN (e00100 < 22000) THEN 21
        WHEN (e00100 < 23000) THEN 22
        WHEN (e00100 < 24000) THEN 23
        WHEN (e00100 < 25000) THEN 24
        WHEN (e00100 < 26000) THEN 25
        WHEN (e00100 < 27000) THEN 26
        WHEN (e00100 < 28000) THEN 27
        WHEN (e00100 < 29000) THEN 28
        WHEN (e00100 < 30000) THEN 29
        ELSE 0
  END AS income_category
FROM puf.puf
WHERE mars != 0 AND mars != 1 AND mars != 3 AND eic != 0 AND e00100 <= 30000 AND e00100 >= 10000 AND e59720 > 0`}
        />

        <H3>
          <a id="Taking_a_Log_Transformation_Rounding_a_Variable_57"></a>Taking
          a Log Transformation, Rounding a Variable
        </H3>
        <Paragraph>
          In this example, we create a new variable, <code>log_income</code>, by
          using a log transformation and rounding the income to the nearest
          $1,000. Remember to add <code>+1</code> to log transforms (or similar,
          depending on the unit of your variable), in most cases, to avoid any
          potential errors.
        </Paragraph>
        <CodeBlock
          code={`CREATE TABLE puf.puf_gmacdonald AS
SELECT e00200, mars, eic, e00100, LOG(e00100 + 1) AS log_income, ROUND(e00100, -3) AS income_thousand, e59720, recid, s006
FROM puf.puf`}
        />

        <H3 className="code-line" data-line-start="67" data-line-end="68">
          <a id="Adding_Two_Columns_Together_Taking_a_Square_Root_67"></a>Adding
          Two Columns Together, Taking a Square Root
        </H3>
        <Paragraph>
          In this example, we create a new variable that adds two columns
          together, and then takes their square root named{' '}
          <code>income_combined_sqrt</code>.
        </Paragraph>
        <CodeBlock
          code={`CREATE TABLE puf.puf_gmacdonald AS
SELECT e00200, mars, eic, e00100, SQRT(e00100 + e00200) AS income_combined_sqrt, e59720, recid, s006
FROM puf.puf`}
        />

        <H2>
          <a id="Summary_Command_Examples_77"></a>Summary Command Examples
        </H2>
        <Paragraph>
          Because summary commands are constrained by the Smartnoise library,
          only the functions provided below are currently supported.
        </Paragraph>

        <H3>
          <a id="Count_by_Category_81"></a>Count by Category
        </H3>
        <Paragraph>
          Using the transformed table <code>puf.puf_gmacdonald</code> from{' '}
          <code>
            Creating a Categorical Variable from a Continuous Variable
          </code>
          , we count the number of records by income category, filing status,
          and earned income tax credit.
        </Paragraph>
        <CodeBlock
          code={`SELECT COUNT(e00100) AS total, mars, eic, income_category
FROM puf.puf_gmacdonald
GROUP BY income_category, mars, eic
ORDER BY income_category, mars, eic`}
        />
        <Paragraph>
          We can also just use the original <code>puf.puf</code> dataset, and
          look at the untransformed count:
        </Paragraph>
        <CodeBlock
          code={`SELECT COUNT(e00100) AS total, mars, eic
FROM puf.puf
GROUP BY mars, eic
ORDER BY mars, eic`}
        />

        <H3>
          <a id="Sum_by_Category_101"></a>Sum by Category
        </H3>
        <Paragraph>
          Using the transformed table <code>puf.puf_gmacdonald</code> from{' '}
          <code>
            Creating a Categorical Variable from a Continuous Variable
          </code>
          , we calculate the sum of income by income category, filing status,
          and earned income tax credit.
        </Paragraph>
        <CodeBlock
          code={`SELECT SUM(e00100) AS total_income, mars, eic, income_category
FROM puf.puf_gmacdonald
GROUP BY income_category, mars, eic
ORDER BY income_category, mars, eic`}
        />
        <Paragraph>
          We can also take the sum of the weight, to get a true idea of the
          weighted count of people by category using the weight variable{' '}
          <code>s006</code> (which we will then have to divide by 100 later per
          the documentation):
        </Paragraph>
        <CodeBlock
          code={`SELECT SUM(s006) AS count_by_income, mars, eic, income_category
FROM puf.puf_gmacdonald
GROUP BY income_category, mars, eic
ORDER BY income_category, mars, eic`}
        />

        <H3>
          <a id="Average_by_Category_121"></a>Average by Category
        </H3>
        <Paragraph>
          Using the transformed table <code>puf.puf_gmacdonald</code> from{' '}
          <code>
            Creating a Categorical Variable from a Continuous Variable
          </code>
          , we calculate the average of income by income category, filing
          status, and earned income tax credit.
        </Paragraph>
        <CodeBlock
          code={`SELECT AVG(e00100) AS average_income, mars, eic, income_category
FROM puf.puf_gmacdonald
GROUP BY income_category, mars, eic
ORDER BY income_category, mars, eic`}
        />

        <H3>
          <a id="Variance_by_Category_132"></a>Variance by Category
        </H3>
        <Paragraph>
          Using the transformed table <code>puf.puf_gmacdonald</code> from{' '}
          <code>
            Creating a Categorical Variable from a Continuous Variable
          </code>
          , we calculate the variance of income by income category, filing
          status, and earned income tax credit.
        </Paragraph>
        <CodeBlock
          code={`SELECT VARIANCE(e00100) AS variance_income, mars, eic, income_category
FROM puf.puf_gmacdonald
GROUP BY income_category, mars, eic
ORDER BY income_category, mars, eic`}
        />

        <H3>
          <a id="Standard_Deviation_by_Category_143"></a>Standard Deviation by
          Category
        </H3>
        <Paragraph>
          Using the transformed table <code>puf.puf_gmacdonald</code> from{' '}
          <code>
            Creating a Categorical Variable from a Continuous Variable
          </code>
          , we calculate the standard deviation of income by income category,
          filing status, and earned income tax credit.
        </Paragraph>
        <CodeBlock
          code={`SELECT STDDEV(e00100) AS stddev_income, mars, eic, income_category
FROM puf.puf_gmacdonald
GROUP BY income_category, mars, eic
ORDER BY income_category, mars, eic`}
        />
      </div>
    </PageTemplate>
  );
}

export default HelpPage;
