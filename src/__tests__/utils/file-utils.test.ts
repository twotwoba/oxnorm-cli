import { describe, it, expect } from 'vitest'
import { deepMerge } from '../../utils/file-utils'

describe('file-utils', () => {
    describe('deepMerge', () => {
        it('should merge simple objects', () => {
            const target = { a: 1, b: 2 }
            const source = { b: 3, c: 4 }
            const result = deepMerge(target, source)

            expect(result).toEqual({ a: 1, b: 3, c: 4 })
        })

        it('should deeply merge nested objects', () => {
            const target = {
                editor: {
                    formatOnSave: false,
                    other: 'value'
                }
            }
            const source = {
                editor: {
                    formatOnSave: true
                }
            }
            const result = deepMerge(target, source)

            expect(result).toEqual({
                editor: {
                    formatOnSave: true,
                    other: 'value'
                }
            })
        })

        it('should handle empty source', () => {
            const target = { a: 1, b: 2 }
            const source = {}
            const result = deepMerge(target, source)

            expect(result).toEqual({ a: 1, b: 2 })
        })

        it('should handle empty target', () => {
            const target = {}
            const source = { a: 1, b: 2 }
            const result = deepMerge(target, source)

            expect(result).toEqual({ a: 1, b: 2 })
        })

        it('should replace arrays instead of merging', () => {
            const target = { arr: [1, 2, 3] }
            const source = { arr: [4, 5] }
            const result = deepMerge(target, source)

            expect(result).toEqual({ arr: [4, 5] })
        })
    })
})
