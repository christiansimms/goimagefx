import Vue from 'vue'

class BreadcrumbService {
  constructor () {
    // Use a separate Vue instance as an event bus.
    this.eventBus = new Vue()
  }
}

export default new BreadcrumbService()
