import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock react-toastify
vi.mock('react-toastify', () => ({
  toast: vi.fn(),
}))

// Don't mock setTimeout globally as it conflicts with waitFor
// The component's setTimeout will be mocked specifically in tests that need it 