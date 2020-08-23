import styled from 'styled-components/native';

interface Props {
  ratio: number;
}

export const Small = styled.ImageBackground`
  width: 100%;
  aspect-ratio: ${(props: Props) => props.ratio};
`;

export const Original = styled.Image`
  width: 100%;
  aspect-ratio: ${(props: Props) => props.ratio};
`;
