import styled from 'styled-components'
import { QUERIES } from '../../constants'

const Field: React.FC = () => {
  return (
    <Pitch>
      <FieldLeft>
        <PenaltyArea></PenaltyArea>
      </FieldLeft>
      <FieldRight>
        <PenaltyArea></PenaltyArea>
      </FieldRight>
      <CenterCircle></CenterCircle>
    </Pitch>
  )
}

const Pitch = styled.div`
  --space: 16px;
  isolation: isolate;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  background: var(--color-field);

  // center line
  :after {
    content: '';
    position: absolute;
    top: 50%;
    left: var(--space);
    display: block;
    width: calc(100% - var(--space) * 2);
    border-top: 1px solid var(--color-white);

    @media ${QUERIES.laptopAndUp} {
      top: var(--space);
      left: 50%;
      height: calc(100% - var(--space) * 2);
      border-left: 1px solid var(--color-white);
      width: revert;
    }
  }

  // perimeter
  :before {
    content: '';
    border: 1px solid var(--color-white);
    position: absolute;
    top: var(--space);
    left: var(--space);
    display: block;
    width: calc(100% - var(--space) * 2);
    height: calc(100% - var(--space) * 2);
  }
`

const CenterCircle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90px;
  height: 90px;
  border: 1px solid var(--color-white);
  border-radius: 50%;
`

// outside box
const PenaltyArea = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  height: 100px;
  width: 200px;
  border: 1px solid var(--color-white);

  @media ${QUERIES.tabletAndUp} {
    height: 125px;
    width: 250px;
  }

  @media ${QUERIES.laptopAndUp} {
    top: 50%;
    transform: translateY(-50%);
    height: 300px;
    width: 150px;
    left: revert;
  }

  // inside box
  :before {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    height: 50px;
    width: 100px;
    border: 1px solid var(--color-white);

    @media ${QUERIES.tabletAndUp} {
      height: 75px;
      width: 150px;
    }

    @media ${QUERIES.laptopAndUp} {
      top: 50%;
      transform: translateY(-50%);
      height: 150px;
      width: 75px;
      left: revert;
    }
  }
`

const FieldLeft = styled.div`
  // adjust outside box to goal line
  // remove left line of outside box
  ${PenaltyArea} {
    top: var(--space);
    border-top: 0;

    @media ${QUERIES.laptopAndUp} {
      left: var(--space);
      border-left: 0;
      top: 50%;
      border-top: 1px solid var(--color-white);
    }

    // remove left line of inside box
    :before {
      top: 0px;
      border-top: 0;

      @media ${QUERIES.laptopAndUp} {
        left: 0px;
        border-left: 0;
        top: 50%;
        border-top: 1px solid var(--color-white);
      }
    }
  }
`

const FieldRight = styled.div`
  // adjust outside box to goal line
  // remove right line of outside box
  ${PenaltyArea} {
    bottom: var(--space);
    border-bottom: 0;

    @media ${QUERIES.laptopAndUp} {
      right: var(--space);
      border-right: 0;
      bottom: revert;
      border-bottom: 1px solid var(--color-white);
    }

    // remove right line of inside box
    :before {
      bottom: 0px;
      border-bottom: 0;

      @media ${QUERIES.laptopAndUp} {
        right: 0px;
        border-right: 0;
        bottom: revert;
        border-bottom: 1px solid var(--color-white);
      }
    }
  }
`

export default Field
