// tslint:disable: no-any
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export default class HistoryHandlerUtils {
  public push(url: string): void {
    this.history.push(url);
  }

  public goBack(): void {
    this.history.goBack();
  }

  public getLocation(): any {
    return this.location;
  }

  private history = useHistory();
  private location = useLocation();
}
