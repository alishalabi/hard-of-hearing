//
//  ViewController.swift
//  UItableView Programmatic
//
//  Created by timofey makhlay on 11/8/18.
//  Copyright © 2018 Timofey Makhlay. All rights reserved.
//

import UIKit
import SwiftyJSON
import Alamofire
import AlamofireImage
import AlamofireNetworkActivityIndicator

class ViewControllerWithAPI: UITableViewController {

    let cellId = "cellId"
    private var allMovies: [Movie] = []
    public var selectedMovie = Movie(json: nil)

    
//    let twoDimetionalArray = [
//        ["Nathan","Johnathan", "Micheal"],
//        ["Zack","Tim","Medi","Ru"],
//        ["Jeremy", "Tom"]
//    ]
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        navigationItem.title = "Top 25 Movies"
        if #available(iOS 11.0, *) {
            navigationController?.navigationBar.prefersLargeTitles = true
        } else {
            // Fallback on earlier versions
        }
        
        let apiToContact = "https://itunes.apple.com/us/rss/topmovies/limit=25/json"
        // This code will call the iTunes top 25 movies endpoint listed above
        Alamofire.request(apiToContact).validate().responseJSON() { response in
            switch response.result {
            case .success:
                if let value = response.result.value {
                    let json = JSON(value)
                    let allMoviesData = json["feed"]["entry"].arrayValue
                    
                    for movie in allMoviesData {
                        let newMovie = Movie(json: movie)
                        self.allMovies.append(newMovie)
                    }
//                    print(self.allMovies)
                    self.tableView.reloadData()
                    
                }
            case .failure(let error):
                print(error)
            }
        }
        tableView.register(UITableViewCell.self, forCellReuseIdentifier: cellId)
    }
    
//    override func tableView(_ tableView: UITableView, viewForHeaderInSection section: Int) -> UIView? {
//        let label = UILabel()
//        label.text = "Header"
//        label.backgroundColor = #colorLiteral(red: 0.6000000238, green: 0.6000000238, blue: 0.6000000238, alpha: 1)
//        return label
//    }
    
//    override func numberOfSections(in tableView: UITableView) -> Int {
//        return allMovies.count
//    }
    
    func regSegue(){
//        // This is for programmatic views only
//        let newViewController = ViewController()
//        self.navigationController?.pushViewController(newViewController, animated: true)
        
//         This works to open storyboards
        
        let storyBoard: UIStoryboard = UIStoryboard(name: "Main", bundle: nil)
        let newViewController = storyBoard.instantiateViewController(withIdentifier: "main") as? ViewController
        newViewController?.currentMovie = selectedMovie
        self.navigationController?.pushViewController(newViewController!, animated: true)
    }
    
    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return allMovies.count
    }
    
    override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        selectedMovie = allMovies[indexPath.row]
//        ViewController.current
        regSegue()
    }
    
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: cellId, for: indexPath)
        
        let currentMovie = allMovies[indexPath.row]
        let movieTitle = currentMovie.name
//        let name = twoDimetionalArray[indexPath.section][indexPath.row]
        cell.textLabel?.text = "\(movieTitle)    Price: $\(currentMovie.price)"
        
        
        
        cell.imageView?.af_setImage(
            withURL: URL(string: currentMovie.imageLink)!,
            placeholderImage: #imageLiteral(resourceName: "logo"),
            filter: AspectScaledToFillSizeWithRoundedCornersFilter(size: CGSize(width: 60, height: 60), radius: 5.0),
            imageTransition: .crossDissolve(0.2)
        )
//        // Adding an image
//        var image : UIImage = #imageLiteral(resourceName: "logo")
//        cell.imageView?.image = image
        
        
//        // Standard options for accessories
//        cell.accessoryType = UITableViewCell.AccessoryType.checkmark
//        cell.accessoryView?.backgroundColor = UIColor.blue
        return cell
    }

}

