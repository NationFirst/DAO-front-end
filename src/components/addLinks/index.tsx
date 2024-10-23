import {useAlertContext} from 'context/alert';
import React from 'react';
import {useFieldArray, useFormContext, useWatch} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import styled from 'styled-components';

import Header from './header';
import Row from './row';
import {IconType, Button} from '@aragon/ods';
import ButtonForm from '../buttons/buttonForm';

export type AddLinks = {
  /** Name of the fieldArray that is the target of the link inputs. Defaults to
   * 'links' */
  arrayName?: string;
  buttonPlusIcon?: boolean;
  buttonLabel?: string;
  bgWhite?: boolean;
};

const AddLinks: React.FC<AddLinks> = ({
  buttonPlusIcon,
  buttonLabel,
  arrayName = 'links',
  bgWhite = false,
}) => {
  const {t} = useTranslation();
  const {control} = useFormContext();
  const links = useWatch({name: arrayName, control});
  const {fields, append, remove} = useFieldArray({name: arrayName, control});
  const {alert} = useAlertContext();

  const controlledLinks = fields.map((field, index) => {
    return {
      ...field,
      ...(links && {...links[index]}),
    };
  });

  // TODO: research focus after input refactor
  const handleAddLink = () => {
    append({name: '', url: ''});
  };

  return (
    <Container data-testid="add-links">
      {fields.length > 0 && (
        <ListGroup>
          <Header />
          {controlledLinks.map((field, index) => (
            <Row
              key={field.id}
              index={index}
              onDelete={() => {
                remove(index);
                alert(t('alert.chip.removedLink') as string);
              }}
              arrayName={arrayName}
            />
          ))}
        </ListGroup>
      )}

      <ButtonForm onClick={handleAddLink}>
        {buttonLabel || t('labels.addLink')}
      </ButtonForm>

      {/*<Button*/}
      {/*  variant="tertiary"*/}
      {/*  size="lg"*/}
      {/*  onClick={handleAddLink}*/}
      {/*  {...(buttonPlusIcon ? {iconLeft: IconType.PLUS} : {})}*/}
      {/*>*/}
      {/*  {buttonLabel || t('labels.addLink')}*/}
      {/*</Button>*/}
    </Container>
  );
};

export default AddLinks;

const Container = styled.div.attrs({className: 'space-y-3'})``;
const ListGroup = styled.div.attrs({
  className: 'flex flex-col rounded-xl',
})``;
