import { ProductWithCursor } from '../pages'
import { calculateImageHeight } from './calculateImageHeight'

export interface ProductWithAnimation extends ProductWithCursor {
  animate?: boolean
}

interface Accumulator {
  col1: ProductWithAnimation[]
  col1Height: number
  col2: ProductWithAnimation[]
  col2Height: number
  col3: ProductWithAnimation[]
  col3Height: number
  col4: ProductWithAnimation[]
  col4Height: number
}

const addAnimationClass = (
  products: ProductWithCursor[],
  last: number
): ProductWithAnimation[] => {
  const productsToAnimate = products
    .slice(-last)
    .map((product) => ({ ...product, animate: true }))
  return [...products.slice(0, products.length - last), ...productsToAnimate]
}

export const createProductGrid = (
  products: ProductWithCursor[],
  lastProductsToAnimate: number
) => {
  const productsWithAnimation =
    products.length === lastProductsToAnimate
      ? products
      : addAnimationClass(products, lastProductsToAnimate)

  return productsWithAnimation.reduce(
    (acc: Accumulator, curr: ProductWithCursor) => {
      if (
        acc.col1Height <= acc.col2Height &&
        acc.col1Height <= acc.col3Height &&
        acc.col1Height <= acc.col4Height
      )
        return {
          ...acc,
          col1: [...acc.col1, curr],
          col1Height:
            acc.col1Height +
            calculateImageHeight(
              curr?.images.edges[0].node.width ?? 0,
              curr?.images.edges[0].node.height ?? 0,
              500
            ),
        }
      else if (
        acc.col2Height <= acc.col1Height &&
        acc.col2Height <= acc.col3Height &&
        acc.col2Height <= acc.col4Height
      )
        return {
          ...acc,
          col2: [...acc.col2, curr],
          col2Height:
            acc.col2Height +
            calculateImageHeight(
              curr.images.edges[0].node.width ?? 0,
              curr.images.edges[0].node.height ?? 0,
              500
            ),
        }
      else if (
        acc.col3Height <= acc.col1Height &&
        acc.col3Height <= acc.col2Height &&
        acc.col3Height <= acc.col4Height
      )
        return {
          ...acc,
          col3: [...acc.col3, curr],
          col3Height:
            acc.col3Height +
            calculateImageHeight(
              curr.images.edges[0].node.width ?? 0,
              curr.images.edges[0].node.height ?? 0,
              500
            ),
        }
      return {
        ...acc,
        col4: [...acc.col4, curr],
        col4Height:
          acc.col4Height +
          calculateImageHeight(
            curr.images.edges[0].node.width ?? 0,
            curr.images.edges[0].node.height ?? 0,
            500
          ),
      }
    },
    {
      col1: [],
      col1Height: 0,
      col2: [],
      col2Height: 0,
      col3: [],
      col3Height: 0,
      col4: [],
      col4Height: 0,
    }
  )
}
