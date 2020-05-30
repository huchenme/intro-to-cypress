import '@testing-library/cypress/add-commands';
import { configure } from '@testing-library/cypress';
import './commands';
configure({ testIdAttribute: 'data-test-id' });
