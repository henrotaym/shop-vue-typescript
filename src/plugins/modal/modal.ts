class Modal {
  private active = "";
  private parameters = {};
  public toggle(name: string, parameters = {}): void {
    this.isActive(name) ? this.hide(name) : this.show(name, parameters);
  }
  public show(name: string, parameters = {}): void {
    this.active = name;
    this.parameters = parameters;
  }
  public hide(name: string): void {
    if (this.isActive(name)) {
      this.active = "";
      this.parameters = {};
    }
  }
  public isActive(name: string): boolean {
    return this.active === name;
  }
  public get params() {
    return this.parameters;
  }
}

export default new Modal();
